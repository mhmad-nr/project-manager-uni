import { StatusEnum } from "./common.type";

export type errorAxiosType = {
    message: string | string[],
    statusCode: number
}
// Auth
export interface AuthSignupReq {
    email: string,
    password: string,
    isManager: boolean
}
export interface AuthSignupRes {
}

export interface AuthSigninReq {
    email: string,
    password: string,
}
export interface AuthSigninRes {

    accessToken: string,
    isManager: boolean,
}

export interface UserType {
    id: string
    email: string
    isManager: boolean
}




// Contact Info
export interface ContactInfoType {
    phone: string,
    address: string,
    email: string,
    isManager: boolean,

}
export interface ContactInfoAdd {
    phone: string,
    address: string,

}

export interface AddressUpdateType {
    address: string
}



// Project

export interface CreateProjectType {
    title: string,
    description: string
}

export type ProjectType = {
    id: string,
    status: StatusEnum
} & CreateProjectType
// function name(params: CreateProjectType & ProjectType) {

// }
// Task
export interface searchTaskType {
    status?: string,
    search?: string,
}
export interface CreateTaskType {
    projectId: string,
    title: string,
    description: string,
    userEmail: string,
    endedAt: string
}

export interface TaskType {
    id?: string,
    title: string,
    description: string,
    status: StatusEnum,
    project_id?: string,
    createdAt?: string,
    endDate?: string
}

export class TaskFilterType {
    status?: StatusEnum;
    search?: string;
    projectId?: string;
}