import { RocketsAuthUserMetadataDto } from '@bitwild/rockets-auth';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@Exclude()
export class UserMetadataDto extends RocketsAuthUserMetadataDto {
  @Expose()
  @ApiProperty({
    description: 'User first name',
    example: 'John',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'First name must be at least 1 character' })
  @MaxLength(100, { message: 'First name cannot exceed 100 characters' })
  firstName?: string;

  @Expose()
  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Last name must be at least 1 character' })
  @MaxLength(100, { message: 'Last name cannot exceed 100 characters' })
  lastName?: string;
}

export class UserMetadataCreateDto extends PickType(UserMetadataDto, [
  'userId',
  'firstName',
  'lastName',
] as const) {
  [key: string]: unknown;
}

export class UserMetadataUpdateDto extends UserMetadataDto {}
