import { BaseEntity } from 'src/common/database/base.entity';
import { Roles } from 'src/common/enum/role-enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { Borrow } from './barrow-entity';
import { History } from './history-entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.OQUVCHI })
  role: Roles;

  @OneToMany(() => Borrow, (borrow) => borrow.user)
  borrow: Borrow[];

  @OneToMany(() => History, (history) => history.user)
  history: History[];
}
