import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CasbinService } from '@eapp/server/core/casbin';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly casbin: CasbinService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const roles: string[] = request['user']?.roles ?? [];
    const url = request.url;
    const method = request.method;
    for (const role of roles) {
      const can = await this.casbin.enforcer.enforce(role, url, method);
      if (can) {
        return true;
      }
    }
    return false;
  }
}
