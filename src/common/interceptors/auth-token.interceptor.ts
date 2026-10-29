import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, //Informações sobre o contexto onde a requisição foi a executada (controller,http,request,response,etc)
    next: CallHandler<any>,
  ) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token || token != '123456') {
      throw new UnauthorizedException('Usuário não logado');
    }

    console.log('Seu token é ', token);
    return next.handle();
  }
}
