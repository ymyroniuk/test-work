import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { CreateBooksDto } from '../src/books/dto/create-books.dto';

const testDto: CreateBooksDto = {
    bookName: 'BookTomasShelby3',
    description: 'Description',
    price: 1700
};

const start = '1';
const limit = '5';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books/create (POST) - success', async () => {
    return supertest(app.getHttpServer())
        .post('/books/create')
        .send(testDto)
        .expect(201)
        .then(({ body }: supertest.Response) => {
            createdId = body._id;
            expect(createdId).toBeDefined();
        });
  });
  it('/books/create (POST) - fail', async () => {
    return supertest(app.getHttpServer())
        .post('/books/create')
        .send({ bookName: 'Book', description: 30, price: 1000})
        .expect(400);
  });
  it('/books/ (GET) - success', () => {
    return supertest(app.getHttpServer())
      .get('/books/'+ '?' + 'start' + '=' + start + '&' + 'limit' + '=' + limit)
      .expect(200);
  });
  afterAll(() => {
      disconnect();
  });
});
