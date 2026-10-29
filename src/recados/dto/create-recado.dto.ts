/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "O campo 'texto' deve ter pelo menos 2 caracteres." })
  @MaxLength(255, { message: "O campo 'texto' deve ter no máximo 255 caracteres." })
  readonly texto!: string;

  @IsPositive()
  deId!: number;

  @IsPositive()
  paraId!: number;
}
