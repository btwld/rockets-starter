import { Entity, ManyToOne } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { OtpSqliteEntity } from '@concepta/nestjs-typeorm-ext';
import { UserEntity } from './user.entity';

@Entity()
export class UserOtpEntity extends OtpSqliteEntity {
  @ManyToOne(() => UserEntity, (user) => user.userOtps)
  assignee!: ReferenceIdInterface;
}
