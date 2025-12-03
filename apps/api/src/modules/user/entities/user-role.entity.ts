import { Entity, ManyToOne, Column } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../../role/role.entity';
import { CommonSqliteEntity } from '@concepta/nestjs-typeorm-ext';

@Entity('user_role')
export class UserRoleEntity extends CommonSqliteEntity {
  @Column({ type: 'varchar', length: 36 })
  userId!: string;

  @Column({ type: 'varchar', length: 36 })
  roleId!: string;

  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  user!: UserEntity;

  @ManyToOne(() => RoleEntity)
  role!: RoleEntity;
}
