import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsEnum } from 'class-validator';
import { Gender } from 'src/utils/Gender.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsEnum(Gender, {
    message: 'gender must be one of the following values: Male, Female, Other',
  })
    gender!: 'Male' | 'Female' | 'Other';

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNumber()
    @Type(() => Number) // Transform the input to a number
    phone!: number;

}

