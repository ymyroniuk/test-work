import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { BooksModel } from './books.model';
import { CreateBooksDto } from './dto/create-books.dto';
import { FindBooksDto } from './dto/find-books.dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel(BooksModel) private readonly booksModel: ModelType<BooksModel>) {}
    async create(dto: CreateBooksDto) {
        return this.booksModel.create(dto);
    }
    async find(bookName: string) {
        return this.booksModel.findOne({ bookName });
    }
    async get(objectQuery: FindBooksDto) {
        const startBooks = parseInt(objectQuery.start);
        const limitBooks = parseInt(objectQuery.limit);
        const skipIndex = (startBooks - 1) * limitBooks;
        return this.booksModel.find()
        .sort({ _id: 1 })
        .limit(limitBooks)
        .skip(skipIndex)
        .exec();
    }
}
