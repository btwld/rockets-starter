import { Entity, OneToMany, OneToOne } from 'typeorm';
import { UserPostgresEntity } from '@concepta/nestjs-typeorm-ext';
import { UserOtpEntity } from './user-otp.entity';
import { FederatedEntity } from './federated.entity';
import { UserRoleEntity } from '../../role/entities/user-role.entity';
import { UserMetadataEntity } from './user-metadata.entity';

@Entity('user')
export class UserEntity extends UserPostgresEntity {
  @OneToMany(() => UserOtpEntity, (userOtp) => userOtp.assignee)
  userOtps?: UserOtpEntity[];

  @OneToMany(() => FederatedEntity, (federated) => federated.assignee)
  federatedAccounts?: FederatedEntity[];

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.assignee)
  userRoles?: UserRoleEntity[];

  @OneToOne(() => UserMetadataEntity, (metadata) => metadata.user)
  userMetadata?: UserMetadataEntity;
}
