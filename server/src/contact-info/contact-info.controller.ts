import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContactInfoCredentialsDto, EditeAddressCredentialsDto } from './dto';
import { ContactInfoService } from './contact-info.service'
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entity';
import { AccessTokenGuard } from 'src/auth/guard';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserInfoCredentials } from './dto/user-info-credentials.dto';


@ApiTags("Contact Info")
@Controller('contact-info')
@UseGuards(AccessTokenGuard)
export class ContactInfoController {
    constructor(private contactInfoService: ContactInfoService) { }

    @Get("")
    @ApiOkResponse({
        type: UserInfoCredentials
    })
    async getInfo(@GetUser() user: User): Promise<UserInfoCredentials> {
        return await this.contactInfoService.getInfo(user)
    }
    @Post("add")
    async addContactInfo(@Body() contactInfoCredentialsDto: ContactInfoCredentialsDto, @GetUser() user: User): Promise<any> {
        return this.contactInfoService.addContactInfo(contactInfoCredentialsDto, user)
    }

    @Post("edite")
    async editeAddress(@Body() editeAddressCredentialsDto: EditeAddressCredentialsDto, @GetUser() user: User): Promise<any> {
        return this.contactInfoService.editeAddress(editeAddressCredentialsDto, user)
    }
}
