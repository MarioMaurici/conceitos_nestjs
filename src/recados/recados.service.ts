import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoasService,
  ) {}

  private recados: Recado[] = [];

  throwNotFoundError: () => never = () => {
    throw new NotFoundException('Recado não encontrado');
  };

  async findAll(paginationDto?: PaginationDto) {
    const { limit, offset } = paginationDto || { limit: 10, offset: 0 };
    const recados = await this.recadoRepository.find({
      relations: { de: true, para: true },
      order: { id: 'desc' },
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
      take: limit, //quantos registros serão exibidos
      skip: offset, //quantos registros serão pulados (para paginação)
    });
    return recados;
  }

  async findOne(id: number) {
    //const recado = this.recados.find(recado => recado.id === id);
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: { de: true, para: true },
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
    });
    if (recado) return recado;
    return this.throwNotFoundError(); /*Considerado erro do cliente retornando 404*/
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;
    const de = await this.pessoaService.findOne(deId);
    const para = await this.pessoaService.findOne(paraId);

    const recado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    } as Recado;

    const novoRecado = this.recadoRepository.create(recado);
    await this.recadoRepository.save(novoRecado);
    return {
      ...recado,
      de: {
        id: recado.de.id,
        nome: recado.de.nome,
      },
      para: {
        id: recado.para.id,
        nome: recado.para.nome,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado: Recado = await this.findOne(id);

    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;

    await this.recadoRepository.save(recado);

    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.remove(recado);
  }
}
