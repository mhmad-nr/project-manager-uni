import React from 'react'
import { StatusEnum, TaskType } from '../../types'
import { Status } from '../Status'
import { Button } from '..'
import { filterString } from '../../util'
import { Link } from 'react-router-dom'
type cardProps = {
    type: "project",
    id: string,
    status: StatusEnum,
    title: string,
} | {
    type: "task"
} & TaskType

export const Item = (props: cardProps) => {

    return (
        <div className="card bg-BGwhite w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title ">{props.title}</h2>
                {props.type == "task" && <p className='break-all text-sm'>{filterString(props.description, 60)}</p>}
                <div className="card-actions justify-between">
                    <Status status={props.status} />
                    <Link to={`/project/${props.id}`}>
                        <Button color='neutral' size='sm' text={`See ${props.type}`} />
                    </Link>
                </div>
            </div>
        </div>
    )
}