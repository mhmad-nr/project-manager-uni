import {
    Body, Controller, Delete, Get,
    Param, Patch, Query, Post, UseGuards,
    // ApiOkResponse
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UserProjectDto, CreateProjectDto, GetProjectFilterDto, UpdateProjectDto } from './dto';
import { AccessTokenGuard } from 'src/auth/guard';
import { User } from 'src/auth/entity';
import { GetUser } from 'src/auth/decorator';
import { OnlyManagerGuard } from 'src/auth/guard';
import { ProjectDto } from './dto/project-credentials-dto';
import { UserDto } from 'src/auth/dto/user-credentials-dto';
import { ApiTags, ApiOkResponse, ApiProperty } from '@nestjs/swagger';


@ApiTags("Project")
@Controller('project')
@UseGuards(AccessTokenGuard)
export class ProjectsController {
    constructor(private projectsService: ProjectsService) { }
    @Get()
    @ApiOkResponse({
        type: [ProjectDto]
    })
    async getProjects(@Query() query: GetProjectFilterDto, @GetUser() user: User): Promise<ProjectDto[]> {
        return await this.projectsService.getProjects(query, user);
    }
    @ApiOkResponse({
        type: ProjectDto
    })
    @Get('/:id')
    async getProjectsById(@Param("id") projectId: string, @GetUser() user: User): Promise<ProjectDto> {
        return await this.projectsService.getProjectById({ projectId, userId: user.id });
    }
    @ApiOkResponse({
        type: [UserDto]
    })
    @Get('users/:id')
    @UseGuards(OnlyManagerGuard)
    async getUsersProject(@Param("id") projectId: string, @GetUser() manager: User): Promise<UserDto[]> {
        return await this.projectsService.getUsers({ projectId, userId: manager.id });
    }
    @Post("create")
    @UseGuards(OnlyManagerGuard)
    async createProject(@Body() createProjectDto: CreateProjectDto, @GetUser() manager: User): Promise<void> {
        console.log(manager);

        await this.projectsService.createProject(createProjectDto, manager);
    }
    @Patch("update/:id")
    @UseGuards(OnlyManagerGuard)
    async updateProject(@Param("id") projectId: string, @GetUser() manager: User, @Body() updateProjectDto: UpdateProjectDto): Promise<void> {
        await this.projectsService.updateProject({ projectId, userId: manager.id }, updateProjectDto);
    }
    @Patch("add-user/:id")
    @UseGuards(OnlyManagerGuard)
    async addUserToProject(@Param("id") projectId: string, @GetUser() manager: User, @Body() userProjectDto: UserProjectDto): Promise<void> {
        await this.projectsService.addUser({ projectId, userId: manager.id }, userProjectDto);
    }
    @Delete("delete/:id")
    @UseGuards(OnlyManagerGuard)
    async deleteProject(@Param("id") projectId: string, @GetUser() manager: User): Promise<void> {
        await this.projectsService.deleteProject({ projectId, userId: manager.id });
    }
    @Delete("delete-user/:id")
    @UseGuards(OnlyManagerGuard)
    async deleteUserToProject(@Param("id") projectId: string, @GetUser() manager: User, @Body() user: UserProjectDto): Promise<void> {

        await this.projectsService.deleteUser({ projectId, userId: manager.id }, user.email);
    }

    // @Delete("leave/:id")
    // async leaveProject(@Param("id") projectId: string, @GetUser() user: User): Promise<void> {
    //     await this.projectsService.deleteProject({ projectId, userId: user.id });
    // }
}
