import React, { FC } from 'react'

type propsType = {
    text?: string
}
const Empty: FC<propsType> = ({ text }) => {
    return (<div className='w-full h-full rounded-3xl border border-dashed flex justify-center items-center'>
        <h2>{text}</h2>
    </div>
    )
}
Empty.defaultProps = {
    text: "Empty"
}

export { Empty }