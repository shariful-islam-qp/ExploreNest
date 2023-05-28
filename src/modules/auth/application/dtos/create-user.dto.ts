import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'First Name',
    type: 'string',
    description: 'First Name',
    required: true,
    example: 'Shariful',
  })
  firstName: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    name: 'Last Name',
    type: 'string',
    description: 'Last Name',
    required: false,
    example: 'Islam',
  })
  lastName?: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    name: 'Email',
    type: 'string',
    description: 'Email',
    required: true,
    example: 'shariful.islam@questionpro.com',
  })
  email: string

  @ApiProperty({
    name: 'Password',
    type: 'string',
    description: 'Password',
    required: true,
    example: 'Password123#@!',
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
