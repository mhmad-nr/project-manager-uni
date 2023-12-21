import { toast } from "react-toastify";

export const BASE_SERVER_URL = "http://localhost:3030"
export const toastFun = (text: string) => {
    toast(text, {
        className: "toast-container",
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });
    return null
}