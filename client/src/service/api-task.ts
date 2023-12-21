import { CreateTaskType, ProjectType, TaskType, searchTaskType } from "../types"
import { BASE_SERVER_URL } from "../util"
import { get, post, delete as delete_, patch } from "./connection"

export function Task() {
    const taskURL = BASE_SERVER_URL + "/task"
    return {

        getById: (taskid: string) => get<TaskType>(`${taskURL}/${taskid}`),

        get: (data: searchTaskType) => post<searchTaskType, TaskType[]>(taskURL, data),
        create: (data: CreateTaskType) => post<CreateTaskType, undefined>(`${taskURL}/create`, data),

        update: (taskId: string, data: ProjectType) => patch<ProjectType, undefined>(`${taskURL}/update/${taskId}`, data),

        delete: (taskId: string) => delete_<undefined>(`${taskURL}/${taskId}`),

    }
}