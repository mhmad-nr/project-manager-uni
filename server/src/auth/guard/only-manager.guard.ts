import { CanActivate, ConflictException, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OnlyManagerGuard implements CanActivate {
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest()
    if (!req.user.isManager) {
      throw new ConflictException("Only manager has access to this section")
    }
    
    return true;
  }
}
