import { PartialType } from '@nestjs/swagger';
import { CreateKutubxonachiDto } from './create-kutubxonachi.dto';

export class UpdateKutubxonachiDto extends PartialType(CreateKutubxonachiDto) {}
