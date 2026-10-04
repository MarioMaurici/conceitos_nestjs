import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;

  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Esse é um recado teste',
      de: 'Joana',
      para: 'Maria',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    const recado = this.recados.find(recado => recado.id === id);

    if (recado) return recado;

    //throw new Error(`Esse erro é do servidor`); /*Considerado erro do servidor retornando 500*/
    // throw new HttpException(
    //   'Recado não encontrado',
    //   HttpStatus.NOT_FOUND,
    // ); /*Considerado erro do cliente retornando 404*/
    return this.throwNotFoundError(); /*Considerado erro do cliente retornando 404*/
  }

  create(createRecadoDto: CreateRecadoDto) {
    const recado = {
      id: ++this.lastId,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    } as Recado;
    this.recados.push(recado);
    return recado;
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const index = this.recados.findIndex(item => item.id === +id);

    if (index < 0) {
      return this.throwNotFoundError();
    }

    this.recados[index] = { ...this.recados[index], ...updateRecadoDto };
    return this.recados[index];
  }

  remove(id: number) {
    const index = this.recados.findIndex(item => item.id === +id);

    if (index < 0) {
      return this.throwNotFoundError();
    }

    const removedRecado = this.recados.splice(index, 1);
    return removedRecado[0];
  }
}
