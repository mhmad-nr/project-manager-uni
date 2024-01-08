import React, { FC, PropsWithChildren, ReducerAction } from "react";
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { ActionsEnum, storeType } from "../types";



const persistConfig = {
    key: 'root',
    storage,
}
const initState = {
    token: "",
    isManager: false
}
interface IActionSignIn {
    type: ActionsEnum.SIGN_IN;
    a: string;
}


interface IActionLogOut {
    type: ActionsEnum.LOG_OUT;
    b: string;
}


type IAction = IActionSignIn | IActionLogOut

const reducer = (state = initState, action: any): storeType => {
    const { type } = action;
    console.log(action);

    switch (type) {
        case ActionsEnum.SIGN_IN:
            return { ...state, token: action.token, isManager: action.isManager }
        case ActionsEnum.LOG_OUT:
            return initState
        default:
            return state;
    }
};

const persistedReducer = persistReducer(persistConfig, reducer)
export let store = createStore(persistedReducer)
let persistor = persistStore(store)

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </>
    );
};