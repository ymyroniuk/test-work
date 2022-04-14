import { Body, Controller, Post, Get, Query, UsePipes, ValidationPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { ALREADY_EXIST, NOT_FOUND_BOOKS_ERROR } from './book.constants';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books.dto';
import { FindBooksDto } from './dto/find-books.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create (@Body() dto: CreateBooksDto) {
        const book = await this.booksService.find(dto.bookName);
        if(book) {
            throw new BadRequestException(ALREADY_EXIST);
        }
        return this.booksService.create(dto);
    }
    @UsePipes(new ValidationPipe())
    @Get()
    async find (@Query() objectQuery: FindBooksDto) {
        const result = await this.booksService.get(objectQuery);
        if(!result) {
            throw new NotFoundException(NOT_FOUND_BOOKS_ERROR);
        }
        return result;
    }
}
