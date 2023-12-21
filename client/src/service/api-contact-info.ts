import { AddressUpdateType, ContactInfoAdd, ContactInfoType } from "../types"
import { BASE_SERVER_URL } from "../util"
import { get, post } from "./connection"

export function ContactInfo() {
    const contactInfo = "contact-info"
    return {

        get: () => get<ContactInfoType>(`${BASE_SERVER_URL}/${contactInfo}`),
        add: (data: ContactInfoAdd) => post<ContactInfoAdd, undefined>(`${BASE_SERVER_URL}/${contactInfo}/add`, data),
        edite: (data: AddressUpdateType) => post<AddressUpdateType, undefined>(`${BASE_SERVER_URL}/${contactInfo}/edite`, data),
    }
}