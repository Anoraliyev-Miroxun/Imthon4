import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { Borrow } from 'src/core/entity/barrow-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/core/entity/book-entity';
import { User } from 'src/core/entity/user-entity';
import { successRes } from 'src/infrastructure/response/get-succes-res';

@Injectable()
export class BorrowService extends BaseService<CreateBorrowDto, UpdateBorrowDto, Borrow> {
  constructor(
    @InjectRepository(Borrow) private readonly borrowRepo: Repository<Borrow>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) { super(borrowRepo) }

  async createBorrow(createBorrowDto: CreateBorrowDto) {
    const { userId, bookId, ...rest } = createBorrowDto;
    const user = await this.userRepo.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    const book = await this.bookRepo.findOne({ where: { id: bookId } })
    if (!book) {
      throw new NotFoundException("book not found")
    }

    const yanigBorrow = await this.borrowRepo.create({
      book, user, ...rest
    })

    await this.borrowRepo.save(yanigBorrow)
    return successRes(yanigBorrow, 201)

  }



  async updateBorrow(id: number, updateBorrowDto: UpdateBorrowDto) {
    const { userId, bookId, ...rest } = updateBorrowDto;

    const data = await this.borrowRepo.findOne({ where: { id } })

    if (bookId) {
      const existTit = await this.bookRepo.findOne({ where: { id: bookId } })
      if (existTit) {
        throw new ConflictException("kitob topilmadi")
      }
    }

    if (userId) {
      const existTit = await this.userRepo.findOne({ where: { id: userId } })
      if (existTit) {
        throw new ConflictException("user topilmadi")
      }
    }

    await this.borrowRepo.update(id, updateBorrowDto)

    const malumot = await this.borrowRepo.findOne({ where: { id } })
    return successRes({ malumot })
  }
}


