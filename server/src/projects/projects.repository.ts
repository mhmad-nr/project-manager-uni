import { EntityRepository, Repository } from "typeorm"
import { InternalServerErrorException, NotFoundException, ConflictException, BadRequestException } from "@nestjs/common"
import { Project } from "./project.entity";
import { CreateProjectDto, IdSCredentialsDto, UpdateProjectDto } from "./dto";
import { GetProjectFilterDto } from "./dto";
import { User } from "src/auth/entity";
import { existType } from "src/types";
import { UserDto } from "src/auth/dto/user-credentials-dto";
import { StatusEnum, serializeDto } from "src/common";
import { ProjectDto } from "./dto/project-credentials-dto";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

    async getProjects(queryDto: GetProjectFilterDto, user: User): Promise<ProjectDto[]> {
        const { id: userId } = user
        const { status, search } = queryDto

        const sqlQuery = `SELECT * FROM project
        INNER JOIN project_user ON project.id = project_user.project_id
        WHERE project_user.user_id = '${userId}'
        ${(status || search) ? "AND" : ""}
        ${status ? `status = '${status}'` : ""} ${(status && search) ? "AND" : ""}
        ${search ? `(title LIKE '%${search}%' OR description LIKE '%${search}%')` : ""} ;`

        const projects = await this.query(sqlQuery)

        const newProjects = projects.map((project) => serializeDto<ProjectDto, Project>(ProjectDto, project))

        return newProjects
    }
    async createProject(createTaskDto: CreateProjectDto, user: User): Promise<void> {

        const { description, title } = createTaskDto
        const { id } = user

        try {

            const sqlQueryInsertProject = `INSERT INTO "project"("id", "title", "description", "status") VALUES (DEFAULT, '${title}' , '${description}', '${StatusEnum.OPEN}') RETURNING "id"`
            const projectId = (await this.query(sqlQueryInsertProject))[0].id

            const sqlQueryInsertProject_users_user = `INSERT INTO "project_user"("project_id", "user_id") VALUES ('${projectId}', '${user.id}')`
            await this.query(sqlQueryInsertProject_users_user)
        } catch (error) {
            throw new InternalServerErrorException()
        }

    }
    async deleteProject(idSCredentialsDto: IdSCredentialsDto): Promise<void> {
        const { projectId, userId } = idSCredentialsDto
        const sqlQuery = `DELETE FROM project
        WHERE project.id = '${projectId}'
        AND EXISTS (
          SELECT 1
          FROM project_user
          WHERE project_user.user_id = '${userId}' AND project_user.project_id = '${projectId}'
        );`

        try {
            await this.query(sqlQuery)
        } catch (error) {
            if (error.code == "22P02") {

                throw new BadRequestException("the projectId is not valid")
            }
            throw new InternalServerErrorException()
        }
    }
    async updateProject(idSCredentialsDto: IdSCredentialsDto, updateProjectDto: UpdateProjectDto): Promise<void> {
        const { title, status, description } = updateProjectDto
        const { projectId } = idSCredentialsDto

        const sqlQuery = `UPDATE project SET ${title ? `title = '${title}',` : ""}${description ? `description = '${description}',` : ""}${status ? `status = '${status}',` : ""}WHERE id = '${projectId}';`
        const newSqlQuery = sqlQuery.replace(",WHERE", " WHERE")

        try {
            await this.query(newSqlQuery)
        } catch (error) {

            if (error.code == "22P02") {
                throw new BadRequestException('the projectId is not valid')
            }
            throw new InternalServerErrorException()
        }
    }
    async addUser(idSCredentialsDto: IdSCredentialsDto, newUser: User): Promise<void> {
        const { id } = newUser
        const { projectId } = idSCredentialsDto

        const sqlQuery = `INSERT INTO project_user (project_id, user_id) VALUES ('${projectId}', '${id}');`
        try {
            await this.query(sqlQuery)
        } catch (error) {

            if (error.code == "22P02") {
                throw new BadRequestException('the projectId is not valid')


            } else if (error.code == '23505') {
                throw new ConflictException("This user has already joined to the project")
            } else {

                throw new InternalServerErrorException()
            }
        }
    }
    async deleteUser(idSCredentialsDto: IdSCredentialsDto, userDeleteId: string): Promise<void> {

        const { projectId } = idSCredentialsDto


        const sqlQuery = `DELETE FROM project_user
        WHERE project_id = '${projectId}' AND user_id = '${userDeleteId}';`
        try {
            await this.query(sqlQuery)
        } catch (error) {

            if (error.code == "22P02") {
                throw new BadRequestException('the projectId is not valid')


            } else if (error.code == '23505') {
                throw new ConflictException("This user has already joined to the project")
            } else {

                throw new InternalServerErrorException()
            }
        }
    }
    async getUsers(idSCredentialsDto: IdSCredentialsDto): Promise<UserDto[]> {
        const { projectId, userId } = idSCredentialsDto

        const sqlQuery = `SELECT * FROM public."user"
        INNER JOIN project_user ON  "user".id = project_user.user_id
        WHERE project_user.project_id = '${projectId}';`

        const allUsers = await this.query(sqlQuery) as User[]
        const users = allUsers.filter((user) => user.id != userId)
        // UserDto
        const newUsers = users.map((user) => serializeDto<UserDto, User>(UserDto, user))
        return newUsers
    }
    async getProjectById(idSCredentialsDto: IdSCredentialsDto): Promise<ProjectDto> {
        const { userId, projectId } = idSCredentialsDto

        const sqlQuery = `SELECT * FROM project
        INNER JOIN project_user ON project.id = project_user.project_id
        WHERE project_user.user_id = '${userId}' AND project.id = '${projectId}';`
        try {
            const [project] = await this.query(sqlQuery)
            if (!project) {
                throw new NotFoundException(`the project with id = ${projectId} does not exist`)
            }
            const newProject = serializeDto<ProjectDto, Project>(ProjectDto, project)
            return newProject

        } catch (error) {
            if (error.code == "22P02") {
                throw new BadRequestException('the projectId is not valid')


            }
            throw new InternalServerErrorException()


        }
    }
    async isProjectExist(idSCredentialsDto: IdSCredentialsDto): Promise<void> {
        const { userId, projectId } = idSCredentialsDto

        const sqlQuery = `SELECT EXISTS (
            SELECT 1
            FROM project
            INNER JOIN project_user ON project.id = project_user.project_id
            WHERE project_user.user_id = '${userId}' AND project.id = '${projectId}'
          );`
        try {
            const [res] = (await this.query(sqlQuery)) as existType

            if (!res.exists) {
                throw new NotFoundException(`the project with id = ${projectId} does not exist`)
            }

        } catch (error) {

            if (error.code == "22P02") {
                throw new BadRequestException('the projectId is not valid')

            } else if (error.status == "404") {

                throw new NotFoundException(`the project with id = ${projectId} does not exist`)
            }
            throw new InternalServerErrorException()

        }
    }
    async isUserExistInProject(idSCredentialsDto: IdSCredentialsDto, userDeleteId: string): Promise<boolean> {

        const { projectId } = idSCredentialsDto
        const sqlQuery = `SELECT EXISTS (SELECT 1 FROM project_user WHERE project_id = '${projectId}' AND user_id = '${userDeleteId}');`

        const [res] = (await this.query(sqlQuery)) as existType
        return res.exists

    }
}