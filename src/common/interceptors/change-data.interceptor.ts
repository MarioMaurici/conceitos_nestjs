import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ChanceDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('ChanceDataInterceptor executado antes');

    return next.handle().pipe(
      map((data: unknown) => {
        if (Array.isArray(data)) {
          return {
            data,
            count: data.length,
          };
        }

        return data;
      }),
    );
  }
}
