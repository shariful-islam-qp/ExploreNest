import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Email',
    type: 'string',
    description: 'Email',
    required: true,
    example: 'shariful.islam@questionpro.com',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Password',
    type: 'string',
    description: 'Password',
    required: true,
    example: 'Password123#@!',
  })
  password: string
}
