import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RemoveSpacesRegex } from './remove-spaces.regex';
import { OnlyLowerCaseLettersRegex } from './only-lowecase-letters.regex';
import { RegexProtocol } from './regex-protocol';

export type ClassNames = 'OnlyLowerCaseLettersRegex' | 'RemoveSpacesRegex';

@Injectable()
export class RegexFactory {
  create(className: ClassNames): RegexProtocol {
    switch (className) {
      case 'OnlyLowerCaseLettersRegex':
        return new OnlyLowerCaseLettersRegex();
      case 'RemoveSpacesRegex':
        return new RemoveSpacesRegex();
      default:
        throw new InternalServerErrorException(`Classe de regex não encontrada: ${className}`);
    }
  }
}
