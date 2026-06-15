import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Public } from 'src/decorators/public.decorator';
import { jwtVerification } from 'src/utils/jxt_verification';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  private readonly logger = new Logger(AuthGuard.name);
  canActivate(context: ExecutionContext): boolean {
    this.logger.log('AuthGuard Logger');
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Authorization token missing');
    }

    if (!jwtVerification(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
