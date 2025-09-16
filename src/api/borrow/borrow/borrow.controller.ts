import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AsseccRole } from 'src/common/decorator/roles.decarators';
import { AuthGuard } from 'src/common/guard/auth-guard';
import { RolesGuard } from 'src/common/guard/role-guard';
import { Roles } from 'src/common/enum/role-enum';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.OQUVCHI)
  @Post()
  @ApiBearerAuth()
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowService.create(createBorrowDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN,Roles.KUTUBXONACHI)
  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.borrowService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN,Roles.KUTUBXONACHI)
  @Get(":id")
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.borrowService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.KUTUBXONACHI,Roles.ADMIN)
  @Patch(":id")
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateBorrowDto: UpdateBorrowDto) {
    return this.borrowService.update(+id, updateBorrowDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.KUTUBXONACHI,Roles.ADMIN)
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.borrowService.remove(+id);
  }
}
