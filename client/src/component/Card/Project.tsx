import { Button, Status } from '..'
import { Link } from 'react-router-dom'
import { StatusEnum } from '../../types'
import { filterString } from '../../util'

type cardProps = {
    id: string,
    status: StatusEnum,
    title: string,

    onClick?: () => void
}
export const Project = ({ id, status, title, onClick }: cardProps) => {

    return (
        <div className="card bg-BGwhite w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title ">{title}</h2>
                {/* {props.type == "task" && <p className='break-all text-sm'>{filterString(description, 60)}</p>} */}
                <div className="card-actions justify-between">
                    <Status status={status} />
                    <Button onClick={onClick} color='neutral' size='sm' text="See Project" />
                </div>
            </div>
        </div>
    )
}