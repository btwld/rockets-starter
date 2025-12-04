import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { CommonPostgresEntity } from '@concepta/nestjs-typeorm-ext';
import { UserEntity } from './user.entity';
import { RocketsAuthUserMetadataEntityInterface } from '@bitwild/rockets-auth';

@Entity('user_metadata')
export class UserMetadataEntity
  extends CommonPostgresEntity
  implements RocketsAuthUserMetadataEntityInterface
{
  @Column()
  id: string;

  @Column()
  userId!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user!: ReferenceIdInterface;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  [key: string]: unknown;
}
