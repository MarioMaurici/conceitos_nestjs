import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UrlParam } from 'src/common/params/url-param.decorator';
import { ONLY_LOWER_CASE_LETTERS_REGEX, REMOVE_SPACES_REGEX, SERVER_NAME } from 'src/recados/recados.constants';
import { RegexProtocol } from 'src/common/regex/regex-protocol';

// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO - Data Transfer Object -> Objeto de transferência de dados
// DTO -> Objeto simples -> Validar dados / Transformar dados

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RegexProtocol,
    @Inject(ONLY_LOWER_CASE_LETTERS_REGEX)
    private readonly onlyLowerCaseLettersRegex: RegexProtocol,
  ) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @UrlParam() url: string) {
    console.log('URL da requisição:', url);
    console.log(this.removeSpacesRegex.execute(this.serverName));
    console.log(this.onlyLowerCaseLettersRegex.execute(this.serverName));
    console.log(this.serverName);
    const recados = await this.recadosService.findAll(paginationDto);
    return recados;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(+id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
