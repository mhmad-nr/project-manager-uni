import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoService } from './contact-info.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfoRepository } from './contact-info.repository';
import { ContactInfoMiddleware } from './contactInfo.middleware';
// import { LoggerMiddleware } from '../auth/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfoRepository]), AuthModule],
  controllers: [ContactInfoController],
  exports: [ContactInfoService],
  providers: [ContactInfoService]
})
// export class ContactInfoModule { }

export class ContactInfoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContactInfoMiddleware)
      .forRoutes(
        { path: "project", method: RequestMethod.ALL },
        { path: "task", method: RequestMethod.ALL },
        { path: "contact-info", method: RequestMethod.GET },
        { path: "contact-info", method: RequestMethod.PATCH }
      )
  }
}
