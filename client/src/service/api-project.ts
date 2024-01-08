import { CreateProjectType, ProjectDataType, ProjectType, UserType } from "../types"
import { BASE_SERVER_URL } from "../util"
import { get, post, delete as delete_, patch } from "./connection"

export function Project() {
    const projectURL = BASE_SERVER_URL + "/project"
    return {

        getAll: (query: string) => get<ProjectType[]>(`${projectURL}${query}`),
        getById: (id: string) => get<ProjectDataType>(`${projectURL}/${id}`),
        getUsers: (projectId: string) => get<UserType[]>(`${projectURL}/users/${projectId}`),

        create: (data: CreateProjectType) => post<CreateProjectType, undefined>(`${projectURL}/create`, data),
        deleteUser: (projectId: string, data: { email: string }) => post<{ email: string }, undefined>(`${projectURL}/delete-user/${projectId}`, data),

        updateById: (projectId: string, data: ProjectType) => patch<ProjectType, undefined>(`${projectURL}/update/${projectId}`, data),
        addUser: (projectId: string, data: { email: string }) => patch<{ email: string }, undefined>(`${projectURL}/add-user/${projectId}`, data),

        delete: (projectId: string) => delete_<undefined>(`${projectURL}/delete/${projectId}`),

    }
}