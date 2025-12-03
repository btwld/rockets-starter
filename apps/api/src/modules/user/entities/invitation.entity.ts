import { Entity } from 'typeorm';
import { InvitationSqliteEntity } from '@concepta/nestjs-typeorm-ext';

@Entity('invitation')
export class InvitationEntity extends InvitationSqliteEntity {}
