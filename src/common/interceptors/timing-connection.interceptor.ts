import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext, //Informações sobre o contexto onde a requisição foi a executada (controller,http,request,response,etc)
    next: CallHandler<any>,
  ) {
    const startTime = Date.now();
    console.log('TimingConnection executado antes');

    await new Promise(resolve => setTimeout(resolve, 3000));
    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
        console.log(`TimingConnection: Levou ${elapsedTime}ms depois`);
      }),
    );
  }
}
