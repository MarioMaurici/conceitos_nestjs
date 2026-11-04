import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtil {
  inverteString(str: string): string {
    return str.split('').reverse().join('');
  }
}
