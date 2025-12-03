import { Entity, ManyToOne } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { RoleAssignmentSqliteEntity } from '@concepta/nestjs-typeorm-ext';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

@Entity()
export class UserRoleEntity extends RoleAssignmentSqliteEntity {
  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  assignee!: ReferenceIdInterface;

  @ManyToOne(() => RoleEntity)
  role!: ReferenceIdInterface;
}
