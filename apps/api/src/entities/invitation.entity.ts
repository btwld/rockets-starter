import { Entity } from 'typeorm';
import { InvitationSqliteEntity } from '@concepta/nestjs-typeorm-ext';

/**
 * Invitation Entity
 */
@Entity('invitation')
export class InvitationEntity extends InvitationSqliteEntity {}

