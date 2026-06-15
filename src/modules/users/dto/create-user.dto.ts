import { IsString, IsNotEmpty, IsEmail, IsNumber, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsEnum(['Male', 'Female', 'Other'])
    gender!: 'Male' | 'Female' | 'Other';

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNumber()
    phone!: number;


    @IsString()
    password!: string;

    @IsNumber()
    salary!: number;

}

