import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as  dotenv from "dotenv"
// import { Engineer, Manager } from './auth/user.entity';
import { ContactInfo } from './contact-info/contactInfo.entity';
import { Project } from './projects/project.entity';
import { Task } from './tasks/task.entity';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactInfoModule } from './contact-info/contact-info.module';
import "reflect-metadata";

dotenv.config()

const DATABASE_HOST = process.env.DATABASE_HOST || ""
const DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10) || 3000
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || ""
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || ""
const DATABASE_NAME = process.env.DATABASE_NAME || ""

// const entities = [Manager, Engineer, Project, Task, ContactInfo]

@Module({
  imports: [AuthModule, ProjectsModule, TasksModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      logging: true,
      // entities,
      autoLoadEntities: true,
      synchronize: true
    }),
    ContactInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
