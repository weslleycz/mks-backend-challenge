import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '../services/redis.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const authorizationHeader = headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const tokenValue = await this.redisService.getValue(token);
    if (!tokenValue) {
      throw new HttpException('Sessão expirada', HttpStatus.UNAUTHORIZED);
    }
    req.body.id = tokenValue;
    next();
  }
}
