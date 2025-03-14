import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class addUser{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "fullName"})
    fullName: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "login"})
    login: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "password"})
    password: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "role"})
    role: string   
}

export class LoginUser{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "login"})
    login: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "password"})
    password: string
}