import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ContactInfoService } from './contact-info.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ContactInfoMiddleware implements NestMiddleware {
    constructor(
        private contactInfoService: ContactInfoService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {

            const jwtService = new JwtService()
            const token = req.headers.authorization.slice(7);
            const { email } = jwtService.verify(token, { secret: "access-token" })
            const isContactInfoAdded = await this.contactInfoService.isContactInfoAdded(email)

            if (!isContactInfoAdded) {
                throw new HttpException('You should first enter your contact info', HttpStatus.I_AM_A_TEAPOT);
            }

            next();
        }

        // this.conta   ctInfoService.getInfo()
    }
}
