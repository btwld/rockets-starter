import { Entity } from 'typeorm';
import { InvitationPostgresEntity } from '@concepta/nestjs-typeorm-ext';

/**
 * Invitation Entity
 */
@Entity('invitation')
export class InvitationEntity extends InvitationPostgresEntity {}

