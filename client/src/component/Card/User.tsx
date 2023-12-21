import { Button } from '..'
import { Link } from 'react-router-dom'

type propsType = {
    id: string,
    email: string
}
export const User = ({ id, email }: propsType) => {

    return (
        <div className="card bg-BGwhite w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title ">{email}</h2>
                <div className="card-actions justify-between">
                    <Link to={`user/${id}`}>
                        <Button color='neutral' size='sm' text={`See User Profile`} />
                    </Link>
                </div>
            </div>
        </div>
    )
}