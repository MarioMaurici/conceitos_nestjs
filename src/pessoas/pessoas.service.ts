import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Pessoa não encontrada');
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaData = {
        nome: createPessoaDto.nome,
        email: createPessoaDto.email,
        passwordHash: createPessoaDto.password,
        createdAt: new Date(),
      };
      const novaPessoa = this.pessoaRepository.create(pessoaData);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado!');
      }
      throw error;
    }
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) return this.throwNotFoundError();
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const partialUpdatePessoaData = {
      passwordHash: updatePessoaDto.password,
      nome: updatePessoaDto.nome,
    };

    const pessoaToUpdate = await this.pessoaRepository.preload({
      id,
      ...partialUpdatePessoaData,
    });

    if (!pessoaToUpdate) return this.throwNotFoundError();

    return await this.pessoaRepository.save(pessoaToUpdate);
  }

  async remove(id: number) {
    const pessoaToRemove = await this.pessoaRepository.findOneBy({ id });
    if (!pessoaToRemove) return this.throwNotFoundError();
    return await this.pessoaRepository.remove(pessoaToRemove);
  }
}
