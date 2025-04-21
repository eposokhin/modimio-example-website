import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthService
    ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());


        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = (await this.authService.getUserRolesById(request.user.id))?.get({ plain: true })

        if (!user?.roles?.length) {
            throw new ForbiddenException('User has no assigned roles');
        }

        const hasPermission = user.roles.some(role => requiredRoles.includes(role.value));

        if (!hasPermission) {
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
}