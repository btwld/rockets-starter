import { Entity, ManyToOne } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { FederatedSqliteEntity } from '@concepta/nestjs-typeorm-ext';
import { UserEntity } from './user.entity';

@Entity()
export class FederatedEntity extends FederatedSqliteEntity {
  @ManyToOne(() => UserEntity, (user) => user.federatedAccounts)
  assignee!: ReferenceIdInterface;
}
