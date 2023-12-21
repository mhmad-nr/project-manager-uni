import { ActionsEnum } from "../types";

const loginAction = (token: string, isManger: boolean) => ({ type: ActionsEnum.SIGN_IN, token, isManger });
const logoutAction = () => ({ type: ActionsEnum.LOG_OUT });

export { loginAction, logoutAction }