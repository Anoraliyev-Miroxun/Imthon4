import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles_key } from 'src/common/decorator/roles.decarators';
import { Roles } from '../enum/role-enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      Roles_key,
      [context.getHandler(), context.getClass()],
    );
    const req = context.switchToHttp().getRequest();
    if (
      requiredRoles.includes(req.user.role) ||
      (requiredRoles.includes('ID') && req.user?.id === req.params.id)
    ) {
      return true;
    } else {
      throw new ForbiddenException('Forbidden user');
    }
  }
}
