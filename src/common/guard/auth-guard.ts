import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { config } from 'src/config/env.config';

export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth: string = req.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException('Authtarization error');
    }

    const bearer = auth.split(' ')[0];
    const token = auth.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unaftarithed');
    }

    try {
      const data = this.jwt.verify(token, { secret: config.token.ACCESS_KEY });
      if (!data) {
        throw new ForbiddenException('token invalid');
      }

      req.user = data;
      return true;
    } catch (error) {
      const errorObject = {
        statusCode: error?.response ? 403 : 401,
        error: {
          message: error?.response
            ? error?.message
            : 'Token expired or incorrect',
        },
      };
      throw new HttpException(
        errorObject.error.message,
        errorObject.statusCode,
      );
    }
  }
}
