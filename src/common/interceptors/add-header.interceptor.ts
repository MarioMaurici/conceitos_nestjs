/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, //Informações sobre o contexto onde a requisição foi a executada (controller,http,request,response,etc)
    next: CallHandler<any>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Custom-Header', 'Valor vindo dos interceptors');
    return next.handle();
  }
}
