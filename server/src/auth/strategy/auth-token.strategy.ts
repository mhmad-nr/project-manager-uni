import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserRepository } from "../repository";
import { JwtPayload } from "../jwt-payload.interface";
import { User } from "../entity";
@Injectable()
export class AuthTokenStrategy extends PassportStrategy(
    Strategy,
    'auth-token',
) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'auth-token',
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user: User = await this.userRepository.findOne({ email });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
