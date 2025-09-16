import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user-entity';
import { Book } from './book-entity';

@Entity('borrow')
export class Borrow extends BaseEntity {
  @Column({ type: 'timestamp', default: new Date() })
  borrow_date: Date;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'timestamp' })
  return_date: Date;

  @Column({ type: 'boolean', default: false })
  overdue: boolean;

  @ManyToOne(() => User, (user) => user.borrow)
  user: User;

  @ManyToOne(() => Book, (book) => book.borrow)
  book: Book;
}
