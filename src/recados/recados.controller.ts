import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

//CRUD
// CREATE -> POST -> Criar um novo recurso
// READ -> GET -> Ler um recurso
// UPDATE -> PATCH/ PUT -> Atualizar um recurso
// DELETE -> DELETE -> Deletar um recurso

// DTO (Data Transfer Object) -> É um objeto que define como os dados serão enviados pela rede.
// DTOs são usados para encapsular os dados e enviá-los de um subsistema de um aplicativo para outro.
// Eles ajudam a reduzir o número de chamadas, simplificar a interface e melhorar a performance da aplicação.

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  //Encontrar todos os recados
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any) {
    console.log(pagination);
    return this.recadosService.findAll();
    //return `Retornaa todos os recados com limit: ${limit} e offset: ${offset}`;
  }

  //Encontrar um recado específico
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(Number(id));
  }

  //Cria um novo recado
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Body() updateRecadoDto: UpdateRecadoDto, @Param('id') id: string) {
    return this.recadosService.update(Number(id), updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.recadosService.remove(id);
  }
}
