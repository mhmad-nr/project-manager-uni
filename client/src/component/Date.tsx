import { getData } from '../util'
type propsType = {
    createdAt: string,
    endDate?: string
}
const MyDate = ({ createdAt, endDate }: propsType) => {
    return (
        <div className='flex gap-x-4'>
            <div className='flex gap-x-2'>
                <p className='text-xs'>Created At:</p>
                <p className='text-xs font-semibold'>{getData(createdAt)}</p>
            </div>
            {endDate && <div className='flex gap-x-2'>
                <p className='text-xs'>Ends In:</p>
                <p className='text-xs font-semibold'>{getData(endDate)}</p>
            </div>}
        </div>
    )
}

export { MyDate }