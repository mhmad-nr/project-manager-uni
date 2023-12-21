import { EntityRepository, Repository } from "typeorm"
import { ContactInfoCredentialsDto } from './dto/contact-info-credentials.dto';
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common/exceptions"
import { ContactInfo } from "./contactInfo.entity";
import { User } from "src/auth/entity";
import { EditeAddressCredentialsDto } from "./dto";
import { existType } from "src/types";
import { UserInfoCredentials } from "./dto/user-info-credentials.dto";

@EntityRepository(ContactInfo)
export class ContactInfoRepository extends Repository<ContactInfo>{

    async getInfo(user: User): Promise<UserInfoCredentials> {
        const sqlQuery = `SELECT * FROM public.contact_info WHERE "userId" = '${user.id}';`

        try {
            const [res] = await this.query(sqlQuery)
            console.log(user);

            return {
                isManager: user.isManager,
                email: user.email,
                phone: res.phone,
                address: res.address
            }

        } catch (err) {
            // log
            if (err.code === '23505') {
                throw new ConflictException("This username is already exists")
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
    async editeAddress(editeAddressCredentialsDto: EditeAddressCredentialsDto, user: User): Promise<void> {
        const { address } = editeAddressCredentialsDto
        const { phone } = await this.getInfo(user)
        const sqlQuery = `UPDATE contact_info SET address = '${address}' WHERE phone = '${phone}';`

        try {
            const res = await this.query(sqlQuery)
            console.log(res);

        } catch (err) {
            throw new InternalServerErrorException()
        }
    }

    async addInfo(contactInfoCredentialsDto: ContactInfoCredentialsDto, user: User): Promise<void> {
        const { address, phone } = contactInfoCredentialsDto
        const sqlQuery = `INSERT INTO "contact_info"("id", "phone", "address", "userId") VALUES (DEFAULT, '${phone}', '${address}', '${user.id}') RETURNING "id"`
        try {
            await this.query(sqlQuery)
        } catch (err) {
            // log
            if (err.code === '23505') {
                throw new ConflictException("This phone number is already exists")
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async isAddedInfo(user: User): Promise<boolean> {
        const sqlQuery = `SELECT EXISTS (SELECT 1 FROM public."contact_info" 
        WHERE contact_info."userId" = '${user.id}');`
        try {

            const [res] = (await this.query(sqlQuery)) as existType

            return res.exists
        } catch (err) {
            // log
            if (err.code === '23505') {
                throw new ConflictException("This username is already exists")
            } else {
                throw new InternalServerErrorException()
            }
        }
    }




}