import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './kutubxonachi.service';
import { CreateUserDto } from './dto/create-kutubxonachi.dto';
import { UpdateUserDto } from './dto/update-kutubxonachi.dto';
import { AuthGuard } from 'src/common/guard/auth-guard';
import { RolesGuard } from 'src/common/guard/role-guard';
import { Roles } from 'src/common/enum/role-enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AsseccRole } from 'src/common/decorator/roles.decarators';
import type { Response } from 'express';

@Controller('Kutubxonachi')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN)
  @Post()
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('signin')
  signin(
    @Body() signInDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.singin(signInDto, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN,'ID')
  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll({
      where: { role: Roles.KUTUBXONACHI },
      order: { createdAt: 'DESC' },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN,'ID')
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: number) {
    return this.userService.gerRepo.findOne({ where: { id } });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN,'ID')
  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AsseccRole(Roles.ADMIN,'ID')
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.userService.delete(+id);
  }
}
