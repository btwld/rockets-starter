import { Entity, ManyToOne } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { FederatedPostgresEntity } from '@concepta/nestjs-typeorm-ext';
import { UserEntity } from './user.entity';

@Entity('federated')
export class FederatedEntity extends FederatedPostgresEntity {
  @ManyToOne(() => UserEntity, (user) => user.federatedAccounts)
  assignee!: ReferenceIdInterface;
}
