import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import Redis from 'ioredis';
import { caching } from 'cache-manager';

dotenv.config();

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as unknown as number,
    });
  }

  async setValue(
    key: string,
    value: string,
    expiresInSeconds?: number,
  ): Promise<void> {
    if (!process.env.NODE_ENV) {
      if (expiresInSeconds) {
        await this.redisClient.set(key, value, 'EX', expiresInSeconds);
      } else {
        await this.redisClient.set(key, value);
      }
    } else {
      const memoryCache = await caching('memory', {
        ttl: 10 * 1000,
      });
      if (expiresInSeconds) {
        await memoryCache.set(key, value, expiresInSeconds * 1000);
      } else {
        await memoryCache.set(key, value);
      }
    }
  }

  async getValue(key: string): Promise<string | null> {
    if (!process.env.NODE_ENV) {
      return this.redisClient.get(key);
    } else {
      const memoryCache = await caching('memory', {
        ttl: 10 * 1000,
      });
      return await memoryCache.get(key);
    }
  }

  async delValue(key: string): Promise<void> {
    if (!process.env.NODE_ENV) {
      await this.redisClient.del(key);
    } else {
      const memoryCache = await caching('memory', {
        ttl: 10 * 1000,
      });
      await memoryCache.del(key);
    }
  }
}
