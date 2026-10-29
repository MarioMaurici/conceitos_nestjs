/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException(`Falha na validação. "${value}" não é um número válido.`);
    }

    if (parsedValue <= 0) {
      throw new BadRequestException(`Falha na validação. "${value}" não é um ID válido. IDs devem ser números inteiros positivos.`);
    }

    return parsedValue;
  }
}
