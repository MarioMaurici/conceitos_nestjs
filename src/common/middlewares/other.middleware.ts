import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//Cliente (Navegador) -> (Servidor) -> Middleware (Request, Response) -> NestJs (Gards, Interceptors, Pipes, Filters....)
export class OtherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers?.authorization;

    if (!authorization) {
      return res.status(404).send({
        message: 'Não encontrado hahah bobocas',
      });
    }

    res.setHeader('Cabecalho', 'Do Middleware');
    next();
    console.log('OtherMiddleware: Tchauuu');
    res.on('finish', () => {
      console.log('SimpleMiddleware: Finalizou e recebeu a resposta');
    });
  }
}
