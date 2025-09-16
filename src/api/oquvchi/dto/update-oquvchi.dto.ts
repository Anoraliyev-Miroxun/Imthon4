import { PartialType } from '@nestjs/swagger';
import { CreateOquvchiDto } from './create-oquvchi.dto';

export class UpdateOquvchiDto extends PartialType(CreateOquvchiDto) {}
