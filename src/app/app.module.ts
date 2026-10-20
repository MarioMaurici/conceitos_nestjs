import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';

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
export class AppModule {}
