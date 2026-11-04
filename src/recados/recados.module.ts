import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtil, RecadosUtilMock } from './recados.util';
import { SERVER_NAME } from 'src/common/constants/server-name.constant';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), forwardRef(() => PessoasModule)],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtil, //Token
      useValue: new RecadosUtilMock(), //Classe que será instanciada quando o token for injetado
    },
    {
      provide: SERVER_NAME,
      useValue: 'My Name is Server',
    },
  ],
  exports: [
    {
      provide: RecadosUtil,
      useClass: RecadosUtil,
    },
    SERVER_NAME,
  ],
})
export class RecadosModule {}
