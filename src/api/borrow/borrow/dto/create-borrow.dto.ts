import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isObject, IsOptional } from "class-validator";

export class CreateBorrowDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId:number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    bookId:number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    due_date:number;
}



// Borrow
// id (PK, UUID)
// userId (FK → User)
// bookId (FK → Book)
// borrow_date (datetime, default: hozirgi vaqt)
// due_date (datetime, majburiy, 7 kun oldinga)
// return_date (datetime, nullable)
// overdue (boolean, default: false)
// Munosabat: Borrow → User (ManyToOne)
// Munosabat: Borrow → Book (ManyToOne