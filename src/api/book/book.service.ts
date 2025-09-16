import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { title } from 'process';
import { BaseService } from 'src/infrastructure/base/base-service';
import { Book } from 'src/core/entity/book-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { existsSync } from 'fs';
import { successRes } from 'src/infrastructure/response/get-succes-res';

@Injectable()
export class BookService extends BaseService<CreateBookDto, UpdateBookDto, Book> {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>
  ) {
    super(bookRepo)
  }
  async createBook(createBookDto: CreateBookDto) {
    const { title: tit, ...rest } = createBookDto;
    const data = await this.bookRepo.findOne({ where: { title: tit } })
    if (data) {
      throw new ConflictException("bunday kitob bor")
    }
    const yangiKitob = this.bookRepo.create({ title: tit, ...rest })
    return this.bookRepo.save(yangiKitob)
  }

  

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    const {title:tit,...rest}=updateBookDto;
    const data=await this.bookRepo.findOne({where:{id}})

    if(tit){
      const existTit=await this.bookRepo.findOne({where:{title:tit}})
      if(existTit && existTit.title!==tit){
        throw new ConflictException("bunday kitob nomi bor")
      }

    }

    await this.bookRepo.update(id,{
      title:tit,...rest
    })

    const malumot=await this.bookRepo.findOne({where:{id}})
    return successRes({malumot})
  }

  
}
