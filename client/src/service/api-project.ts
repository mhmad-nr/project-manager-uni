import { CreateProjectType, ProjectType, UserType } from "../types"
import { BASE_SERVER_URL } from "../util"
import { get, post, delete as delete_, patch } from "./connection"

export function Project() {
    
    return {

        getAll: (query: string) => get<ProjectType[]>(`${BASE_SERVER_URL}/project${query}`),
        getById: (id: string) => get<ProjectType>(`${BASE_SERVER_URL}/project/${id}`),
        getUsersById: (projectId: string) => get<UserType[]>(`${BASE_SERVER_URL}/project/users/${projectId}`),

        create: (data: CreateProjectType) => post<CreateProjectType, undefined>(`${BASE_SERVER_URL}/project/create`, data),
        deleteUserFrom: (projectId: string, data: { email: string }) => post<{ email: string }, undefined>(`${BASE_SERVER_URL}/project/delete-user/${projectId}`, data),

        updateById: (projectId: string, data: ProjectType) => patch<ProjectType, undefined>(`${BASE_SERVER_URL}/project/update/${projectId}`, data),
        addUserTo: (projectId: string, data: { email: string }) => patch<{ email: string }, undefined>(`${BASE_SERVER_URL}/project/add-user/${projectId}`, data),

        delete: (projectId: string) => delete_<undefined>(`${BASE_SERVER_URL}/project/delete/${projectId}`),

    }
}