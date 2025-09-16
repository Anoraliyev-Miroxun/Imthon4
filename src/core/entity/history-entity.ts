import { BaseEntity } from 'src/common/database/base.entity';
import { Roles } from 'src/common/enum/role-enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { SinglePrimitiveCriteria } from 'typeorm/common/PrimitiveCriteria.js';
import { User } from './user-entity';
import { Book } from './book-entity';
import { ActionBorrow } from 'src/common/enum/borrow-action';

@Entity('history')
export class History extends BaseEntity {
  @Column({ type: 'enum', enum: ActionBorrow, default: ActionBorrow.RETURN })
  action: ActionBorrow;

  @Column({ type: 'timestamp', default: new Date() })
  date: Date;

  @ManyToOne(() => User, (user) => user.history)
  user: User;

  @ManyToOne(() => Book, (book) => book.history)
  book: Book;
}
