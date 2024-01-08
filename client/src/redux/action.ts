import { ActionsEnum } from "../types";

const loginAction = (token: string, isManager: boolean) => ({ type: ActionsEnum.SIGN_IN, token, isManager });
const logoutAction = () => ({ type: ActionsEnum.LOG_OUT });

export { loginAction, logoutAction }