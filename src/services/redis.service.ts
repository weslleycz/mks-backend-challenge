import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import Redis from 'ioredis';

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
    if (expiresInSeconds) {
      await this.redisClient.set(key, value, 'EX', expiresInSeconds);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async delValue(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
