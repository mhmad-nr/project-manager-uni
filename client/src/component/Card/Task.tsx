import React from 'react'
import { StatusEnum, TaskType } from '../../types'
import { Status } from '../Status'
import { Button } from '..'
import { filterString } from '../../util'


type cardProps = {
    id: string,
    onClick?: () => void
} & TaskType

export const Task = ({ description, id, status, title, onClick }: cardProps) => {

    return (
        <div className="card bg-BGwhite w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title ">{title}</h2>
                <p className='break-all text-sm'>{filterString(description, 60)}</p>
                <div className="card-actions justify-between">
                    <Status status={status} />

                    <Button onClick={onClick} color='neutral' size='sm' text={`See Task`} />
                </div>
            </div>
        </div>
    )
}