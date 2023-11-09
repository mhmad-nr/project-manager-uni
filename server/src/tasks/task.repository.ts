import { NotFoundException } from "@nestjs/common"
import { EntityRepository, Repository } from "typeorm"
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/query-task.dto";
import { User } from "src/auth/entity";
import { existType } from "src/types";
import { TaskDto } from "./dto/task-credentials.dto";
import { StatusEnum, serializeDto } from "src/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(queryDto: GetTasksFilterDto, user: User): Promise<TaskDto[]> {

        const { search, status, projectId } = queryDto

        const sqlQuery = `SELECT * FROM task WHERE task."userId" = '${user.id}' 
        ${projectId ? `AND task.projectId = '${projectId}'` : ""}
        ${(status || search) ? "AND" : ""}
        ${status ? `status = '${status}'` : ""} ${(status && search) ? "AND" : ""}
        ${search ? `(title LIKE '%${search}%' OR description LIKE '%${search}%')` : ""}; `

        const tasks = (await this.query(sqlQuery)) as Task[]
        const newTasks = tasks.map((task) => serializeDto<TaskDto, Task>(TaskDto, task))

        return newTasks

    }
    async getTaskById(id: string, user: User): Promise<TaskDto> {

        const sqlQuery = `SELECT * FROM task WHERE task."userId" = '${user.id}' AND task.id = '${id}'`

        const task = (await this.query(sqlQuery)) as Task

        return serializeDto<TaskDto, Task>(TaskDto, task)

    }
    async deleteTask(id: string, user: User): Promise<Task> {

        const sqlQuery = `DELETE FROM task WHERE task."userId" = '${user.id}' AND task.id = '${id}'`
        try {

            const res = (await this.query(sqlQuery)) as Task

            return res

        } catch (error) {

        }
    }
    async isTaskExist(id: string, user: User): Promise<void> {

        const sqlQuery = `SELECT EXISTS(SELECT 1 FROM task WHERE task."userId" = '${user.id}' AND task.id = '${id}')`

        const [res] = (await this.query(sqlQuery)) as existType
        if (!res.exists) {
            throw new NotFoundException(`the task does not exist`)

        }


    }
    async createTask(createTaskDto: CreateTaskDto, userId: string): Promise<void> {
        const { title, description, projectId, endedAt } = createTaskDto

        const sqlQuery = `INSERT INTO "task"("id", "title", "description", "status", "createdAt", "endDate", "userId", "projectId") 
        VALUES (DEFAULT, '${title}', '${description}', '${StatusEnum.OPEN}', DEFAULT, ${endedAt ? `'${endedAt}',` : "DEFAULT,"} 
        '${userId}', 
        '${projectId}') 
        RETURNING "id", "createdAt"`

        try {

            const res = await this.query(sqlQuery)
            console.log(res);

        } catch (error) {
            console.log(error);

        }

    }
    async updateTaskStatus(id: string, status: StatusEnum): Promise<void> {
        console.log(status);

        const sqlQuery = `UPDATE task SET status = '${status}' WHERE  id = '${id}';`

        try {

            const res = await this.query(sqlQuery)
            console.log(res);

        } catch (error) {
            console.log(error);

        }

    }

}