/* eslint-disable prettier/prettier */
import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, //Informações sobre o contexto onde a requisição foi a executada (controller,http,request,response,etc)
    next: CallHandler<any>,
  ) {
    console.log('ErrorHandlingInterceptor executado antes');

    //await new Promise(resolve => setTimeout(resolve, 3000));
    return next.handle().pipe(
      catchError(error => {
        return throwError (()=> {
          if (error instanceof NotFoundException) {
            return new BadRequestException(error.message);
          }

          return new BadRequestException('Ocorreu um erro desconhecido.')
        });
      }),
    );
  }
}
