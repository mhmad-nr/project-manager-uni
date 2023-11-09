import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectRepository } from './projects.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectDto, CreateProjectDto, GetProjectFilterDto, IdSCredentialsDto, UpdateProjectDto } from './dto';
import { User } from 'src/auth/entity';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/auth/dto/user-credentials-dto';
import { ProjectDto } from './dto/project-credentials-dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project) private projectRepository: ProjectRepository,
        private authService: AuthService
    ) { }

    async getProjects(queryDto: GetProjectFilterDto, user: User): Promise<ProjectDto[]> {

        return this.projectRepository.getProjects(queryDto, user)
    }

    async getUsers(idSCredentialsDto: IdSCredentialsDto): Promise<UserDto[]> {
        await this.projectRepository.isProjectExist(idSCredentialsDto)

        return this.projectRepository.getUsers(idSCredentialsDto)
    }

    async getProjectById(idSCredentialsDto: IdSCredentialsDto): Promise<ProjectDto> {
        return await this.projectRepository.getProjectById(idSCredentialsDto)
    }

    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<void> {
        await this.projectRepository.createProject(createProjectDto, user)
    }

    async deleteProject(idSCredentialsDto: IdSCredentialsDto): Promise<void> {
        await this.projectRepository.isProjectExist(idSCredentialsDto)

        return this.projectRepository.deleteProject(idSCredentialsDto)
    }

    async updateProject(idSCredentialsDto: IdSCredentialsDto, updateProjectDto: UpdateProjectDto): Promise<void> {
        await this.projectRepository.isProjectExist(idSCredentialsDto)

        return this.projectRepository.updateProject(idSCredentialsDto, updateProjectDto)
    }
    async addUser(idSCredentialsDto: IdSCredentialsDto, userProjectDto: UserProjectDto): Promise<void> {
        const { email } = userProjectDto
        await this.projectRepository.isProjectExist(idSCredentialsDto)

        const newUser = await this.projectIDont(idSCredentialsDto, email)

        return this.projectRepository.addUser(idSCredentialsDto, newUser)
    }

    async deleteUser(idSCredentialsDto: IdSCredentialsDto, email: string): Promise<void> {


        const user = await this.projectIDont(idSCredentialsDto, email)

        const isUserExistInProject = await this.projectRepository.isUserExistInProject(idSCredentialsDto, user.id)

        if (!isUserExistInProject) {
            throw new NotFoundException("The user does not exist in the project")
        }

        return this.projectRepository.deleteUser(idSCredentialsDto, user.id)
    }
    async projectIDont(idSCredentialsDto: IdSCredentialsDto, email: string): Promise<User> {
        await this.projectRepository.isProjectExist(idSCredentialsDto)

        return this.authService.findUserByEmail(email)
    }

}
