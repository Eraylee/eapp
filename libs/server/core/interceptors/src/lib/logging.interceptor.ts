import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Elog } from '@eapp/server/core/utils';
// import { JwtPayload } from '@eapp/server/core/auth';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap((res) => {
        const status = 200;
        const url = req.url;
        const method = req.method;
        const response = JSON.stringify(res);
        const ip = req.headers['x-real-ip'] || req['connection'].remoteAddress;
        const logFormat = `
        ------------------------------------------------------------------
              Request url: ${url}
              Method: ${method}
              IP: ${ip}
              Status：${status}
              res : ${response}
        -------------------------------------------------------------------
      `;

        Elog.log(logFormat);
      })
    );
  }
}
