import {
  RocketsAuthUserCreateDto,
  RocketsAuthUserDto,
  RocketsAuthUserUpdateDto,
} from '@bitwild/rockets-auth';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UserMetadataDto } from './user-metadata.dto';

@Exclude()
export class UserDto extends RocketsAuthUserDto {
  @ApiProperty({
    type: UserMetadataDto,
    required: false,
    description: 'User metadata',
  })
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => UserMetadataDto)
  userMetadata?: UserMetadataDto;
}

export class UserCreateDto extends RocketsAuthUserCreateDto {
  @ApiProperty({
    type: UserMetadataDto,
    required: false,
    description: 'User metadata',
  })
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => UserMetadataDto)
  declare userMetadata?: UserMetadataDto;
}

export class UserUpdateDto extends RocketsAuthUserUpdateDto {
  @ApiProperty({
    type: UserMetadataDto,
    required: false,
    description: 'User metadata',
  })
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => UserMetadataDto)
  declare userMetadata?: UserMetadataDto;
}
