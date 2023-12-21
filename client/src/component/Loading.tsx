import React from 'react'
import { ReactComponent as LoadingSvg } from '../assets/icons/loading.svg'
type stateType = {
    size?: "large" | "medium" | "small"
}
const Loading = ({ size }: stateType) => {
    return (
        <LoadingSvg />
    )
}

export default Loading