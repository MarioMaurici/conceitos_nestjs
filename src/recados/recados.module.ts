import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtil } from './recados.util';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
    MyDynamicModule.register({ apiKey: 'your-api-key', apiUrl: 'https://api.example.com' }),
  ],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtil],
})
export class RecadosModule {}
