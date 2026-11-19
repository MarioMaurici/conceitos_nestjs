import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingService,
  ) {}

  async login(loginDto: LoginDto) {
    const pessoa = await this.pessoaRepository.findOneBy({ email: loginDto.email });
    if (!pessoa) {
      throw new UnauthorizedException('Email ou Senha Invalidos');
    }

    const passwordIsValid = await this.hashingService.compare(loginDto.password, pessoa.passwordHash);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Email ou Senha Invalidos');
    }

    //Criação do novo Token JWT para o usuário autenticado, caso seja necessário.

    return {
      message: 'Usuário Autenticado com Sucesso',
    };
  }
}
