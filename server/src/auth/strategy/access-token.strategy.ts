import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserRepository } from "../repository";
import { JwtPayload } from "../jwt-payload.interface";
import { User } from "../entity";


// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ""
// console.log(JWT_SECRET_KEY);


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'access-token'
    })
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