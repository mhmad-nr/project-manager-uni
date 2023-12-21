import { Body, Controller, Delete, Get, Param, Patch, Query, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/query-task.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/auth/entity';
import { AccessTokenGuard, OnlyManagerGuard } from 'src/auth/guard';
import { TaskDto } from './dto/task-credentials.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UpdateStatusTaskDto } from './dto';


@ApiTags("Task")
@Controller('task')
@UseGuards(AccessTokenGuard)
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get("/:id")
    @ApiOkResponse({
        type: TaskDto
    })
    async getTaskId(@Param("id") id: string, @GetUser() user: User): Promise<TaskDto> {
        return await this.tasksService.getTaskId(id, user);
    }

    @ApiOkResponse({
        type: [TaskDto]
    })
    @Post()
    async getTasks(@Body() getTasksFilterDto: GetTasksFilterDto, @GetUser() user: User): Promise<TaskDto[]> {
        return await this.tasksService.getTasks(getTasksFilterDto, user);
    }

    @Post("create")
    @UseGuards(OnlyManagerGuard)
    async createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() manager: User): Promise<void> {
        return await this.tasksService.createTask(createTaskDto, manager);
    }

    @Patch("update/:id")
    async updateStatusTask(@Param("id") id: string, @Body() status: UpdateStatusTaskDto, @GetUser() user: User): Promise<void> {
        return await this.tasksService.updateTaskStatus(id, status.status, user);
    }

    @Delete("/:id")
    @UseGuards(OnlyManagerGuard)
    async deleteTask(@Param("id") id: string, @GetUser() manager: User): Promise<void> {
        return await this.tasksService.deleteTask(id, manager);
    }
}
