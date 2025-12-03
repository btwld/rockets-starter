import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudAdapter } from '@concepta/nestjs-crud';
import { UserMetadataEntity } from '../entities/user-metadata.entity';
import { RocketsAuthUserMetadataEntityInterface } from '@bitwild/rockets-auth';

@Injectable()
export class UserMetadataAdapter extends TypeOrmCrudAdapter<RocketsAuthUserMetadataEntityInterface> {
  constructor(
    @InjectRepository(UserMetadataEntity)
    repo: Repository<RocketsAuthUserMetadataEntityInterface>,
  ) {
    super(repo);
  }
}
