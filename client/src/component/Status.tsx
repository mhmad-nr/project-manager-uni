import React from 'react'
import { StatusEnum } from '../types/common.type'
type propsType = {
    status: StatusEnum
}
export const Status = ({ status }: propsType) => {
    const statusVar = {
        OPEN: "badge-outline badge-info",
        IN_PROGRESS: "badge-outline badge-accent",
        DONE: "badge-success",
    }
    return <div className={`badge font-semibold ${status == "DONE" ? "text-White3" : ""} pt-4 pb-[18px] ${statusVar[status]}`}>{status}</div>
}

