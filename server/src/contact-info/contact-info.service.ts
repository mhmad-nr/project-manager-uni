import { Injectable } from '@nestjs/common';
import { ContactInfoRepository } from './contact-info.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfoCredentialsDto } from "./dto/contact-info-credentials.dto"
import { User } from 'src/auth/entity';
import { EditeAddressCredentialsDto } from './dto';
@Injectable()
export class ContactInfoService {
    constructor(@InjectRepository(ContactInfoRepository) private contactInfoRepository: ContactInfoRepository) { }

    async getInfo(user: User): Promise<ContactInfoCredentialsDto> {
        return this.contactInfoRepository.getInfo(user)
    }
    async addContactInfo(contactInfoCredentials: ContactInfoCredentialsDto, user: User): Promise<any> {
        return this.contactInfoRepository.addInfo(contactInfoCredentials, user)
    }
    async editeAddress(editeAddressCredentialsDto: EditeAddressCredentialsDto, user: User): Promise<any> {
        return this.contactInfoRepository.editeAddress(editeAddressCredentialsDto, user)
    }
}
