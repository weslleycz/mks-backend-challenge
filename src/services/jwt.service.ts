import { Injectable } from '@nestjs/common';
import { sign, verify, decode, Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { RedisService } from './redis.service';

dotenv.config();

@Injectable()
export class JWTService {
  private SECURITY_JWT: Secret;

  constructor(private readonly redisService: RedisService) {
    this.SECURITY_JWT = process.env.SECURITY_JWT;
  }

  public async login(id: string, expiresIn: string): Promise<string> {
    const payload = {
      data: id,
    };
    const token = sign(payload, this.SECURITY_JWT, { expiresIn });
    await this.redisService.setValue(token, id, 259200);
    return token;
  }

  public verify(token: string): boolean {
    try {
      verify(token, this.SECURITY_JWT);
      return true;
    } catch (err) {
      return false;
    }
  }

  public decodeJwt(token: string) {
    return decode(token);
  }

  public async logout(token: string) {
    await this.redisService.delValue(token);
  }
}
