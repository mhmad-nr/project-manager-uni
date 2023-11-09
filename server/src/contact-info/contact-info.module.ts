import { Module } from '@nestjs/common';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoService } from './contact-info.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfoRepository } from './contact-info.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfoRepository]), AuthModule],
  controllers: [ContactInfoController],
  providers: [ContactInfoService]
})
export class ContactInfoModule { }
