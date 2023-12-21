import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ContactInfoRepository } from './contact-info.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfoCredentialsDto } from "./dto/contact-info-credentials.dto"
import { User } from 'src/auth/entity';
import { EditeAddressCredentialsDto } from './dto';
import { AuthService } from 'src/auth/auth.service';
import { UserInfoCredentials } from './dto/user-info-credentials.dto';
@Injectable()
export class ContactInfoService {
    constructor(@InjectRepository(ContactInfoRepository) private contactInfoRepository: ContactInfoRepository,
        private authService: AuthService,
    ) { }

    async getInfo(user: User): Promise<UserInfoCredentials> {
        return this.contactInfoRepository.getInfo(user)
    }
    async addContactInfo(contactInfoCredentials: ContactInfoCredentialsDto, user: User): Promise<any> {
        const isAddedBefore = await this.isContactInfoAdded(user.email)

        if (isAddedBefore) {
            throw new NotAcceptableException("Your contact info is already added")
        }

        return this.contactInfoRepository.addInfo(contactInfoCredentials, user)
    }
    async isContactInfoAdded(email: string): Promise<boolean> {
        const user = await this.authService.findUserByEmail(email)
        return this.contactInfoRepository.isAddedInfo(user)
    }
    async editeAddress(editeAddressCredentialsDto: EditeAddressCredentialsDto, user: User): Promise<any> {
        return this.contactInfoRepository.editeAddress(editeAddressCredentialsDto, user)
    }
}
