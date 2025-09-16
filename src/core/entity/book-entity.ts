import { BaseEntity } from 'src/common/database/base.entity';
import { Roles } from 'src/common/enum/role-enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { SinglePrimitiveCriteria } from 'typeorm/common/PrimitiveCriteria.js';
import { History } from './history-entity';
import { Borrow } from './barrow-entity';

@Entity('book')
export class Book extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'varchar' })
  published_year: string;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @OneToMany(() => History, (history) => history.book)
  history: History[];

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrow: Borrow[];
}
