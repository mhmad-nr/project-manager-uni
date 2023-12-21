import React, { useState, useEffect } from 'react'

type skeletonProps = {
    count: number,
    width?: string,
    height?: string,
    spacing?: string
}

export const Skeleton: React.FC<skeletonProps> = ({ count, width, height, spacing }) => {
    const [skeleton, setSkeleton] = useState([0])
    // // const { x, y } = spacing
    useEffect(() => {

        const newArray = []
        for (let i = 0; i < count; i++) {
            newArray.push(i)
        }
        setSkeleton(newArray)
    }, [])


    return <>
        <div className={`w-full ${spacing}`}>
            {skeleton.map(() => <>
                <div className={`skeleton ${width} ${height}`}></div>
            </>)}
        </div>
    </>

}

Skeleton.defaultProps = {
    count: 1,
    width: "w-full",
    height: "h-full",
}