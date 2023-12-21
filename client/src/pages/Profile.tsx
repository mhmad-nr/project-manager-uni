import React, { useEffect, useState } from 'react'
import { Button, Skeleton } from '../component'
import { toastFun } from '../util'
import { ContactInfo } from '../service'
import { useSelector } from 'react-redux'
import { storeType } from '../types'
import { useSearchParams } from 'react-router-dom'


type stateType = {
    email: string,
    isManager: boolean,
    phone: string,
    address: string,
}


const Profile = () => {
    const [state, setState] = useState<stateType>({
        email: "",
        isManager: false,
        phone: '',
        address: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isEditeAddress, setIsEditeAddress] = useState(false)

    // const isManager = useSelector<storeType, boolean>((store) => store.isManager)
    const [ussseParams] = useSearchParams();

    useEffect(() => {

        getInfo()

    }, [])
    const getInfo = async () => {
        setIsLoading(true)

        try {
            const res = await ContactInfo().get()
            const { address, phone, email, isManager } = res.data
            setState({ address, phone, email, isManager })
        } catch (err) {
            console.log(err);

        } finally {
            setIsLoading(false)
        }

    }
    const editeAddress = async () => {

        if (!isEditeAddress) {
            toastFun("Now you can edite your address")
            return setIsEditeAddress(true)
        }


        if (state.address.length < 3) return toastFun("Please enter address more than 3 characters")
        try {
            await ContactInfo().edite({ address: state.address })
            toastFun("Your address has edited successfully")
            setIsEditeAddress(false)

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex w-full min-h-full py-6">
            <div className="flex-1 h-20 pl-6">
                <div className='mt-3 mb-6'>
                    <h1 className='text-xl font-semibold'>Profile</h1>
                </div>
                <div className='w-full flex flex-col gap-y-4'>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email:</span>
                        </div>
                        {isLoading ? <>
                            <Skeleton count={1} height='h-[48px]' />
                        </> : <>
                            <input value={state.email} type="text" className="input input-bordered w-full max-w-xs" disabled />
                        </>}
                    </label>
                    <label className="form-control w-full max-w-xs">

                        <div className="label">
                            <span className="label-text">Phone:</span>
                        </div>
                        {!isLoading ? <>
                            <input value={state.phone} type="text" className="input input-bordered w-full max-w-xs" disabled />
                        </> : <>
                            <Skeleton count={1} height='h-[48px]' />
                        </>}
                    </label>
                    <div className='flex items-center gap-x-8'>
                        <p className='label-text'>Role:</p>
                        {isLoading ? <>
                            <Skeleton count={1} width='w-[48px]' height='h-[24px]' />
                        </> : <>
                            <span className='font-semibold'>{state.isManager ? "Manager" : "User"}</span>
                        </>}
                    </div>
                </div>

            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex-1 pr-6">
                <div className='mt-3 mb-6'>
                    <h1 className='text-xl font-semibold'>Contact Info</h1>
                </div>
                <div className='w-full flex flex-col gap-y-4'>
                    <label className="form-control w-full max-w-xs">

                        <div className="label">
                            <span className="label-text">Address:</span>
                        </div>
                        {!isLoading ? <>
                            <textarea
                                disabled={!isEditeAddress}
                                value={state.address}
                                onChange={(e) => setState({ ...state, address: e.currentTarget.value })}
                                rows={12} className="textarea resize-none textarea-bordered h-24 outline-none min-h-[150px] min-w-[400px]" placeholder="Your address"></textarea>
                        </> : <>
                            <Skeleton count={1} width='w-[400px]' height='h-[150px]' />
                        </>}
                    </label>

                    <div className='flex justify-end'>
                        <Button isOutlined onClick={editeAddress} size='wide' color='primary' text={isEditeAddress ? "Send" : 'Edite'} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile