import { Entity } from 'typeorm';
import { RoleSqliteEntity } from '@concepta/nestjs-typeorm-ext';

@Entity()
export class RoleEntity extends RoleSqliteEntity {}
