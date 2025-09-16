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
import { UserService } from './oquvchi.service';
import { CreateOquvchiDto } from './dto/create-oquvchi.dto';
import { UpdateOquvchiDto } from './dto/update-oquvchi.dto';
import { AuthGuard } from 'src/common/guard/auth-guard';
import { RolesGuard } from 'src/common/guard/role-guard';
import { Roles } from 'src/common/enum/role-enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AsseccRole } from 'src/common/decorator/roles.decarators';
import type { Response } from 'express';

@ApiTags("O'quvchi")
@Controller('Oquvchi')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post()
  create(@Body() CreateOquvchiDto: CreateOquvchiDto) {
    return this.userService.createUser(CreateOquvchiDto);
  }

  @Post('signin')
  signin(
    @Body() signInDto: CreateOquvchiDto,
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
      where: { role: Roles.ADMIN },
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
  update(@Param('id') id: number, @Body() updateUserDto: UpdateOquvchiDto) {
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
