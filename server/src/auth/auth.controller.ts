import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto, SignInCredentialsDto } from './dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { JwtResponesDto } from './dto/jwt-respones-dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post("signup")
    async signup(@Body() authCredentials: SignUpCredentialsDto): Promise<any> {
        return this.authService.signup(authCredentials)
    }
    @Post("signin")
    @ApiOkResponse({
        type: JwtResponesDto
    })
    async signin(@Body() authCredentials: SignInCredentialsDto): Promise<JwtResponesDto> {
        return this.authService.signin(authCredentials)
    }
}
