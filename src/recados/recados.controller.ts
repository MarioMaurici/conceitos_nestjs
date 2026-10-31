import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import express from 'express';

//CRUD
// CREATE -> POST -> Criar um novo recurso
// READ -> GET -> Ler um recurso
// UPDATE -> PATCH/ PUT -> Atualizar um recurso
// DELETE -> DELETE -> Deletar um recurso

// DTO (Data Transfer Object) -> É um objeto que define como os dados serão enviados pela rede.
// DTOs são usados para encapsular os dados e enviá-los de um subsistema de um aplicativo para outro.
// Eles ajudam a reduzir o número de chamadas, simplificar a interface e melhorar a performance da aplicação.

@Controller('recados')
@UseInterceptors(AuthTokenInterceptor)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto, @Req() req: express.Request) {
    console.log('RecadosController', req['user']);
    //throw new BadRequestException('Error e tals');
    return this.recadosService.findAll(paginationDto);
  }

  //Encontrar um recado específico
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  //Cria um novo recado
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Body() updateRecadoDto: UpdateRecadoDto, @Param('id', ParseIntPipe) id: number) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
