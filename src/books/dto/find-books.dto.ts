import { IsString } from 'class-validator';
export class FindBooksDto {
    @IsString()
    start: string;
    @IsString()
    limit: string;
}