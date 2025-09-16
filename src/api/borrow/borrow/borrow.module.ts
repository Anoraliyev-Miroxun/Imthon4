import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/core/entity/barrow-entity';
import { Book } from 'src/core/entity/book-entity';
import { User } from 'src/core/entity/user-entity';

@Module({
  imports:[TypeOrmModule.forFeature([Borrow,Book,User])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
