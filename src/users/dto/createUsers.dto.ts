import { ApiProperty, PartialType } from '@nestjs/swagger';
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

export class CreateUsersDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email must be valid',
    example: 'example@gmail.com',
  })
  email: string;
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the user must be at least 3 characters long',
    example: 'Chill',
  })
  name: string;
  @ApiProperty({
    description: 'Strong password is required',
    example: `aB!12cDe`,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password must include 8-15 chars, uppercase, lowercase, number, and special character',
    },
  )
  @IsNotEmpty()
  @IsString()
  password: string;
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Address must be at least 3 characters long',
    example: '1234 Fake St',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Phone number cannot be empty',
    example: '123-456-7890',
  })
  phone: string;
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Country name must be at least 5 characters long',
    example: 'Canada',
  })
  country: string;
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'City name must be at least 5 characters long',
    example: 'Vancouver',
  })
  city: string;
  @IsOptional()
  @ApiProperty({
    description: 'The date when the user was created',
  })
  createdAt: Date;
  @IsOptional()
  @ApiProperty({
    description:
      'Assigned by default when the user is created, it must not be included in the body',
    default: false,
  })
  isAdmin: boolean;
}

export class UsersDto extends PartialType(CreateUsersDTO) {
  email: string;

  name: string;

  password: string;

  address: string;

  phone: string;

  country: string;

  city: string;

  createdAt: Date;

  isAdmin: boolean;
}
