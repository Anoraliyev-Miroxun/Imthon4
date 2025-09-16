import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AsseccRole } from 'src/common/decorator/roles.decarators';
import { RolesGuard } from 'src/common/guard/role-guard';
import { AuthGuard } from 'src/common/guard/auth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/enum/role-enum';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN, Roles.KUTUBXONACHI)
  @Post()
  @ApiBearerAuth()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN, Roles.KUTUBXONACHI)
  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.bookService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN, Roles.KUTUBXONACHI)
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.bookService.getById(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN, Roles.KUTUBXONACHI)
  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN, Roles.KUTUBXONACHI)
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }
}
