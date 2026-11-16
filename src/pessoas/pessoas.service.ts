import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Pessoa não encontrada');
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const passwordHash: string = await this.hashingService.hash(createPessoaDto.password);
      const pessoaData = {
        nome: createPessoaDto.nome,
        email: createPessoaDto.email,
        passwordHash,
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
      nome: updatePessoaDto.nome,
    };

    if (updatePessoaDto?.password) {
      const passwordHash: string = await this.hashingService.hash(updatePessoaDto.password);

      partialUpdatePessoaData['passwordHash'] = passwordHash;
    }

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
