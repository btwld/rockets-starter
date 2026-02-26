import { Entity } from 'typeorm';
import { RolePostgresEntity } from '@concepta/nestjs-typeorm-ext';

@Entity('role')
export class RoleEntity extends RolePostgresEntity {}
