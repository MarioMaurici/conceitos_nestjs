import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtil, RecadosUtilMock } from './recados.util';
import { ONLY_LOWER_CASE_LETTERS_REGEX, REMOVE_SPACES_REGEX, SERVER_NAME } from 'src/recados/recados.constants';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowerCaseLettersRegex } from 'src/common/regex/only-lowecase-letters.regex';

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
    {
      provide: ONLY_LOWER_CASE_LETTERS_REGEX,
      useClass: OnlyLowerCaseLettersRegex, // Condição para escolher qual classe será instanciada
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useClass: RemoveSpacesRegex, // Condição para escolher qual classe será instanciada
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
