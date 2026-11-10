import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtil } from './recados.util';
import { RegexFactory } from 'src/common/regex/regex.factory';
import { ONLY_LOWER_CASE_LETTERS_REGEX, REMOVE_SPACES_REGEX } from './recados.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), forwardRef(() => PessoasModule)],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadosUtil,
    RegexFactory,
    {
      provide: REMOVE_SPACES_REGEX, //token de injeção de dependência
      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('RemoveSpacesRegex');
      },
      inject: [RegexFactory],
    },
    {
      provide: ONLY_LOWER_CASE_LETTERS_REGEX, //token de injeção de dependência
      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('OnlyLowerCaseLettersRegex');
      },
      inject: [RegexFactory],
    },
  ],
})
export class RecadosModule {}
