import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudAdapter } from '@concepta/nestjs-crud';
import { UserEntity } from '../entities/user.entity';
import { RocketsAuthUserEntityInterface } from '@bitwild/rockets-auth';

@Injectable()
export class UserAdapter extends TypeOrmCrudAdapter<RocketsAuthUserEntityInterface> {
  constructor(
    @InjectRepository(UserEntity)
    repo: Repository<RocketsAuthUserEntityInterface>,
  ) {
    super(repo);
  }
}
