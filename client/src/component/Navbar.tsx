import React from 'react'
import { ReactComponent as LogoSvg } from '../assets/icons/logo.svg'
import { Link, useNavigate } from "react-router-dom"
import { Button } from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { storeType } from '../types'
import { logoutAction } from '../redux/action'
export const Navbar = () => {

    const token = useSelector<storeType>((store) => store.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = () => {
        dispatch(logoutAction())
        navigate('/')
    }
    return (
        <div className='w-full shadow-md'>
            <div className="navbar bg-base-100 py-4 container mx-auto">
                <div className="flex-1">
                    <Link to={"/"} >
                        <LogoSvg width={111 * 1.5} height={24 * 1.5} />
                    </Link>

                </div>
                <div className="flex-none gap-2">
                    {!token ? <>
                        <Link to={"/register"} >
                            <Button size='md' color='primary' text='Sign IN / UP' />
                        </Link>
                    </> : <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li className='mb-2'>
                                <Button onClick={() => navigate('/profile')} size='xs' isOutlined color='ghost' text='Profile' />
                            </li>
                            <li>
                                <Button onClick={logOut} size='xs' isOutlined color='error' text='Log out' />
                            </li>
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
