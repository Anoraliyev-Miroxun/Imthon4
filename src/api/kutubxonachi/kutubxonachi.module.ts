import { Module } from '@nestjs/common';
import { UserService } from './kutubxonachi.service';
import { UserController } from './kutubxonachi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user-entity';
import { CryptoService } from 'src/infrastructure/crypto/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, CryptoService, TokenService],
})
export class KutubxonaciModule {}
