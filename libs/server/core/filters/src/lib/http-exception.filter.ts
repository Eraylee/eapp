import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Elog } from '@eapp/server/core/utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res: any = exception.getResponse();
    const rawMessage = res['message'];
    let message = '';
    if (Array.isArray(rawMessage)) {
      message = rawMessage.join(',');
    } else if (typeof rawMessage === 'string') {
      message = rawMessage;
    }
    const json = {
      code: status,
      message,
      data: null,
    };
    const logFormat = `
    ------------------------------------------------------------------
          Request url: ${request.url}
          Method: ${request.method}
          Status：${status}
          IP: ${request.ip}
          res : ${JSON.stringify(res)}
    -------------------------------------------------------------------
  `;
    Elog.error(logFormat);
    response.status(status).json(json);
  }
}
