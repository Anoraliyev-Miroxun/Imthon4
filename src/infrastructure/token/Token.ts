import { Injectable } from '@nestjs/common';
import { IToken } from './token-interface';
import { config } from 'src/config/env.config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  async accessToken(payload: IToken): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: config.token.ACCESS_KEY,
      expiresIn: config.token.ACCESS_TIME,
    });
  }

  async refreshToken(payload: IToken): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: config.token.REFRESH_KEY,
      expiresIn: config.token.REFRESH_TIME,
    });
  }

  async writeCookie(
    res: Response,
    key: string,
    value: string,
    time: number,
  ): Promise<void> {
    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      maxAge: Number(time) * 60 * 60 * 1000,
    });
  }

  async verifyToken(token: string, secretKey: string): Promise<object> {
    return this.jwt.verifyAsync(token, { secret: secretKey });
  }
}
