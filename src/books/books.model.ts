import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface BooksModel extends Base {}
export class BooksModel extends TimeStamps {
    @prop({ unique: true })
    bookName: string;
    @prop()
    description: string;
    @prop()
    price: number;
}
