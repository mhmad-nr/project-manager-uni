import { contextActionsEnum } from "../types";

export function reducer(store: any, action: any): any {
    const { type, payload } = action;
    switch (type) {

        case contextActionsEnum.SIGN_IN:
            return {
                ...store,
                activeAccount: payload.activeAccount,
                accounts: payload.accounts
            };
        case contextActionsEnum.LOG_OUT:
            return {
                ...store,
                activeAccount: payload.activeAccount,
            };
        default:
            return store;
    }
}