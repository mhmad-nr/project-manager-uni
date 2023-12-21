export enum ActionsEnum {
    SIGN_IN = "SIGN_IN",
    SIGN_UP = "SIGN_UP",
    LOG_OUT = "LOG_OUT",

}
export interface storeType {
    token: string;
    isManager: boolean;
}
export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}
export interface User {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}