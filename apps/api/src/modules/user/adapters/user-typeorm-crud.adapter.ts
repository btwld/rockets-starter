import { Injectable } from '@nestjs/common';
import { CrudAdapter, TypeOrmCrudAdapter } from '@concepta/nestjs-crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RocketsAuthUserEntityInterface } from '@bitwild/rockets-auth';

@Injectable()
export class UserTypeOrmCrudAdapter
  extends TypeOrmCrudAdapter<RocketsAuthUserEntityInterface>
  implements CrudAdapter<RocketsAuthUserEntityInterface>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<RocketsAuthUserEntityInterface>,
  ) {
    super(repository);
  }
}
