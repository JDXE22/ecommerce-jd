import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUsersDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  @IsString()
  name: string;
  @Matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/, {
    message:
      'Password must have lower case, uppercase, a number and special character',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  country: string;
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsOptional()
  @IsDate()
  createdAt: Date
  @IsOptional()
  isAdmin: boolean;
}

export class UsersDto extends PartialType(CreateUsersDTO){

  email: string;

  name: string;

  password: string;

  address: string;

  phone: string;

  country: string;

  city: string;

  createdAt: Date

  isAdmin: boolean;







}
