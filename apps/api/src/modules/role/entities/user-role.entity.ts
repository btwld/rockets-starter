import { Entity, ManyToOne } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { RoleAssignmentPostgresEntity } from '@concepta/nestjs-typeorm-ext';
import { UserEntity } from '../../user/entities/user.entity';
import { RoleEntity } from './role.entity';

@Entity('user_role')
export class UserRoleEntity extends RoleAssignmentPostgresEntity {
  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  assignee!: ReferenceIdInterface;

  @ManyToOne(() => RoleEntity)
  role!: ReferenceIdInterface;
}
