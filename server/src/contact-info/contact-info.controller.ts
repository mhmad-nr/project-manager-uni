import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContactInfoCredentialsDto, EditeAddressCredentialsDto } from './dto';
import { ContactInfoService } from './contact-info.service'
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entity';
import { AccessTokenGuard } from 'src/auth/guard';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';


@ApiTags("Contact Info")
@Controller('contact-info')
@UseGuards(AccessTokenGuard)
export class ContactInfoController {
    constructor(private contactInfoService: ContactInfoService) { }

    @Get("get-info")
    @ApiOkResponse({
        type: ContactInfoCredentialsDto
    })
    async getInfo(@GetUser() user: User): Promise<ContactInfoCredentialsDto> {
        return await this.contactInfoService.getInfo(user)
    }
    @Post("add")
    async addContactInfo(@Body() contactInfoCredentialsDto: ContactInfoCredentialsDto, @GetUser() user: User): Promise<any> {
        return this.contactInfoService.addContactInfo(contactInfoCredentialsDto, user)
    }

    @Post("edite-address")
    async editeAddress(@Body() editeAddressCredentialsDto: EditeAddressCredentialsDto, @GetUser() user: User): Promise<any> {
        return this.contactInfoService.editeAddress(editeAddressCredentialsDto, user)
    }
}
