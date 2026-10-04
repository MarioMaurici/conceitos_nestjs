import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getExemple(): string {
    return 'Rota de Exemplo usando o Service';
  }
}
