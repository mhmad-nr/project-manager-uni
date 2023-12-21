import { useEffect, useState } from 'react'
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/action';
type modeType = "Sign In" | "Sign Up"

type stateType = {
    mode: modeType
}



const LoginRigester = () => {
    const [state, setState] = useState<stateType>({
        mode: 'Sign In',
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logoutAction())
    }, [])

    const changeMode = (currentMode: modeType) => { setState({ ...state, mode: currentMode }) }
    return (

        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-96 h-[500px] relative border rounded-3xl px-2'>


                <div className='w-full h-[80px] pt-4'>
                    <h2 className='text-5xl text-center'>{state.mode}</h2>
                </div>
                <div className='w-full h-[420px] '>
                    {state.mode == "Sign In" ? <>

                        <SignIn />
                    </> : <>

                        <SignUp doSignIn={() => changeMode('Sign In')} />
                    </>}
                </div>

                <div className='absolute -bottom-10 left-0 w-full flex justify-center'>
                    {state.mode == "Sign In" ? <>
                        <p className='text-base '>You do not have account <span onClick={() => changeMode("Sign Up")} className='text-Blue text-lg font-semibold cursor-pointer'>Sgin Up</span> </p>
                    </> : <>
                        <p className='text-base '>You have account <span onClick={() => changeMode("Sign In")} className='text-Blue text-lg font-semibold cursor-pointer'>Sgin In</span> </p>
                    </>}
                </div>
            </div>
        </div>
    )
}
export default LoginRigester