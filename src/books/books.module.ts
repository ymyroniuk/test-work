import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BooksController } from './books.controller';
import { BooksModel } from './books.model';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BooksModel,
        schemaOptions: {
          collection: 'Books'
        }
      }
    ])
  ],
  providers: [BooksService]
})
export class BooksModule {}
