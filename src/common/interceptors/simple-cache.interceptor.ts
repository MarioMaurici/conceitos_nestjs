import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, any>();

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('SimpleCacheInterceptor executado antes');

    const request = context.switchToHttp().getRequest<{ url: string }>();
    const url = request.url;

    console.log(url);

    if (this.cache.has(url)) {
      console.log('Está no cache:', url);
      return of(this.cache.get(url));
    }

    await new Promise<void>(resolve => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(data => {
        console.log('Dados recebidos do controller:', data);

        this.cache.set(url, data);

        console.log('Cache salvo:', this.cache.get(url));
      }),
    );
  }
}
