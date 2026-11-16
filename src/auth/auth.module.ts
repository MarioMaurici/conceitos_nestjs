import { Global, Module } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Global() // Pode ser utilizado na aplicação inteira, sem precisar importar em cada módulo
@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [HashingService],
})
export class AuthModule {}
