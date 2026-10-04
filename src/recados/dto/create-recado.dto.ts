/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "O campo 'texto' deve ter pelo menos 2 caracteres." })
  @MaxLength(255, { message: "O campo 'texto' deve ter no máximo 255 caracteres." })
  readonly texto!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "O campo 'de' deve ter pelo menos 2 caracteres." })
  @MaxLength(100, { message: "O campo 'de' deve ter no máximo 100 caracteres." })
  readonly de!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "O campo 'para' deve ter pelo menos 2 caracteres." })
  @MaxLength(100, { message: "O campo 'para' deve ter no máximo 100 caracteres." })
  readonly para!: string;
}
