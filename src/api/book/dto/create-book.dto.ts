import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isObject, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    author:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    published_yea:string;
}
