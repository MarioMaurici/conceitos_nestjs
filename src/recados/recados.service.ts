import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  private recados: Recado[] = [];

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    //const recado = this.recados.find(recado => recado.id === id);
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });
    if (recado) return recado;
    return this.throwNotFoundError(); /*Considerado erro do cliente retornando 404*/
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const recado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    } as Recado;

    const novoRecado = this.recadoRepository.create(recado);
    return this.recadoRepository.save(novoRecado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto.lido,
      texto: updateRecadoDto.texto,
    };
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });
    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.remove(recado);
  }
}
