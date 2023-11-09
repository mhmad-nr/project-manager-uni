import { EntityRepository, Repository } from "typeorm"
import { ContactInfoCredentialsDto } from './dto/contact-info-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common/exceptions"
import { ContactInfo } from "./contactInfo.entity";
import { User } from "src/auth/entity";
import { EditeAddressCredentialsDto } from "./dto";

@EntityRepository(ContactInfo)
export class ContactInfoRepository extends Repository<ContactInfo>{

    async getInfo(user: User): Promise<ContactInfoCredentialsDto> {
        const sqlQuery = `SELECT * FROM public.contact_info WHERE "userId" = '${user.id}';`

        try {
            const [res] = await this.query(sqlQuery)
            return {
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
                throw new ConflictException("This username is already exists")
            } else {
                throw new InternalServerErrorException()
            }
        }
    }




}