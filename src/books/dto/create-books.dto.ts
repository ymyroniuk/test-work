import { IsNumber, IsString } from 'class-validator';

export class CreateBooksDto {
    @IsString()
    bookName: string;
    @IsString()
    description: string;
    @IsNumber()
    price: number;
}