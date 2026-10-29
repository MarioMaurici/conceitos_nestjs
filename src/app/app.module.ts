import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { OtherMiddleware } from 'src/common/middlewares/other.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'recados',
      autoLoadEntities: true, //Carrega entidades sem precisar especifica-las manualmente
      synchronize: true, //Sincroniza o banco de dados com as entidades, NÃO DEVE SER USADO EM PRODUÇÃO, POIS PODE APAGAR DADOS EXISTENTES
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware, OtherMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
