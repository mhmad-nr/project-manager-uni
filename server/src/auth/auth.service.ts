import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository';
import { SignUpCredentialsDto, SignInCredentialsDto } from './dto';
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { User } from './entity';
import { JwtResponesDto } from './dto/jwt-respones-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private jwtService: JwtService) { }

    async signup(authCredentials: SignUpCredentialsDto): Promise<any> {
        return this.userRepository.createUser(authCredentials)
    }

    async signin(authCredentials: SignInCredentialsDto): Promise<JwtResponesDto> {
        const { email, password } = authCredentials
        const user = await this.findUserByEmail(email)
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (user && isPasswordCorrect) {
            const accessToken = this.jwtService.sign({ email })
            return { accessToken, isManager: user.isManager }
        } else {
            throw new UnauthorizedException("please check your login credentials")
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findUser(email)
    }
}
