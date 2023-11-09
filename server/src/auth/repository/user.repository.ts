import { EntityRepository, Repository } from "typeorm"
import { User } from "../entity";
import { SignUpCredentialsDto } from '../dto';
import { ConflictException, HttpException, InternalServerErrorException, NotFoundException, HttpStatus } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { existType } from "src/types";
@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(authCredentials: SignUpCredentialsDto): Promise<void> {
        const { password, email, isManager } = authCredentials

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const sqlQuery = `INSERT INTO "user"("id", "email", "password", "is_manager") VALUES (DEFAULT, '${email}', '${hashedPassword}', ${isManager}) RETURNING "id"`

        try {
            await this.query(sqlQuery)

        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException("This email is already exists")
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async findUser(email: string): Promise<User> {
        await this.isUserExist(email)

        const sqlQuery = `SELECT * FROM public."user" WHERE email = '${email}';`
        try {
            const [res] = await this.query(sqlQuery)
          
            return res

        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException("This email is already exists")
            } else if (err.status == "404") {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: `the project with email = ${email} does not exist`,
                }, HttpStatus.NOT_FOUND, {
                    cause: err
                });
            }
            throw new InternalServerErrorException()
        }
    }
    async isUserExist(email: string): Promise<void> {
        const sqlQuery = `SELECT EXISTS (SELECT * FROM public."user" WHERE email = '${email}');`

        try {
            const [res] = (await this.query(sqlQuery)) as existType
            if (!res.exists) {
                throw new NotFoundException()
            }

        } catch (error) {
            if (error.code == "22P02") {
                throw new HttpException({
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'the email is not valid',
                }, HttpStatus.NOT_ACCEPTABLE, {
                    cause: error
                });
            } else if (error.status == "404") {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: `the user with email = ${email} does not exist`,
                }, HttpStatus.NOT_FOUND, {
                    cause: error
                });
            }
            throw new InternalServerErrorException()
        }
    }

}