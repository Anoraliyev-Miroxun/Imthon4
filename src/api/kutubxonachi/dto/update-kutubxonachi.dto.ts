import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-kutubxonachi.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
