import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/env.config';
import { UserModule } from './Admin/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BookModule } from './book/book/book.module';
import { BorrowModule } from './borrow/borrow/borrow.module';
import { User } from 'src/core/entity/user-entity';
import { Borrow } from 'src/core/entity/barrow-entity';
import { Book } from 'src/core/entity/book-entity';
import { History } from 'src/core/entity/history-entity';
import { OquvchiModule } from './oquvchi/oquvchi.module';
import { KutubxonaciModule } from './kutubxonachi/kutubxonachi.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:process.env.DB_URL,
      synchronize: true,
      autoLoadEntities: true,
      entities: [User,History,Borrow,Book],
    }),
    JwtModule.register({
      global: true,
    }),
    UserModule,
    BookModule,
    BorrowModule,
    OquvchiModule,
    KutubxonaciModule,
  ],
})
export class AppModule {}
