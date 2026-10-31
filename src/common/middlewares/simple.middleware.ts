import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//Cliente (Navegador) -> (Servidor) -> Middleware (Request, Response) -> NestJs (Gards, Interceptors, Pipes, Filters....)
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Olá');

    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Luiz',
        sobrenome: 'Otavio',
        //role: 'Admin',
      };

      next();
    } else {
      //Encerrando a cadeia de chamadas
      return res.status(404).send({
        message: 'Não encontrado hahah bobocas',
      });
    }
  }
}
