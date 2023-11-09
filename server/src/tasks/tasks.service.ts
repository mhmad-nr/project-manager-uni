import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/query-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { AuthService } from 'src/auth/auth.service';
import { ProjectsService } from 'src/projects/projects.service';
import { User } from 'src/auth/entity';
import { TaskDto } from './dto/task-credentials.dto';
import { StatusEnum } from 'src/common';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private taskRepository: TaskRepository,
        private authService: AuthService,
        private projectsService: ProjectsService
    ) { }

    async getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<TaskDto[]> {
        return this.taskRepository.getTasks(getTasksFilterDto, user)
    }


    async getTaskId(id: string, user: User): Promise<TaskDto> {
        await this.taskRepository.isTaskExist(id, user)

        return this.taskRepository.getTaskById(id, user)
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<void> {
        const { projectId, userEmail } = createTaskDto

        const userm = await this.projectsService.projectIDont({ projectId, userId: user.id }, userEmail)

        return this.taskRepository.createTask(createTaskDto, userm.id)
    }
    async deleteTask(id: string, user: User): Promise<void> {
        await this.taskRepository.isTaskExist(id, user)

        await this.taskRepository.deleteTask(id, user)
    }

    async updateTaskStatus(id: string, status: StatusEnum, user: User): Promise<void> {
        await this.taskRepository.isTaskExist(id, user)

        return await this.taskRepository.updateTaskStatus(id, status)
    }

}
