import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(req: Request): boolean {
    const bearerToken = req.header('Authorization');
    if (!bearerToken || !bearerToken.startsWith('Bearer')) {
      // Bearer Token 이 아닌 경우
      return false;
    }

    const token = bearerToken.split(' ')[1];
    if (!token) {
      // 토큰이 주어지지 않은 경우
      return false;
    }

    const realToken = this.configService.get('AUTHORIZATION_TOKEN') as string;
    if (!realToken) {
      return false;
    }

    return token === realToken;
  }
}
