import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudAdapter } from '@concepta/nestjs-crud';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleTypeOrmCrudAdapter extends TypeOrmCrudAdapter<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {
    super(roleRepo);
  }
}
