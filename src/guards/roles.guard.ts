import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(Roles, [context.getHandler(), context.getClass()]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    const hasRole = roles.includes(user);

    if (!hasRole) {
      throw new ForbiddenException(
        `User does not have required roles: ${roles.join(', ')}`,
      );
    }

    return true;
  }
}
