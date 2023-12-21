import { AuthSigninReq, AuthSigninRes, AuthSignupReq, AuthSignupRes } from "../types"
import { BASE_SERVER_URL } from "../util"
import { post } from "./connection"


export function Auth() {
    const AUTH_URL = "auth"
    return {
        signUp: (data: AuthSignupReq) => post<AuthSignupReq, AuthSignupRes>(`${BASE_SERVER_URL}/${AUTH_URL}/signup`, data),
    signIn: (data: AuthSigninReq) => post<AuthSigninReq, AuthSigninRes>(`${BASE_SERVER_URL}/${AUTH_URL}/signin`, data),
    }
}