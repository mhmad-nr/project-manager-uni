import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { AuthSigninReq } from '../../types'
import { Auth } from '../../service'
import { loginAction } from '../../redux/action'
import { toastFun } from '../../util'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../component'

const intialValues = {
    email: "",
    password: ""
}
const schema = Yup.object().shape({
    email: Yup.string().email("the Email shoud be valid").required("the Email Field is required"),
    password: Yup.string()
        .required("the Password Field is required")
        .matches(
            /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, "the Password should be a valid"),
})
const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (value: AuthSigninReq) => {
        try {
            const { data } = await Auth().signIn(value)
            console.log(data);

            const { accessToken, isManager } = data
            dispatch(loginAction(accessToken, isManager))
            toastFun("you have signed in successfully")
            navigate('/project')

        } catch (error: any) {
            toastFun(error.response.data.error)
        }

    }
    return (
        <Formik
            initialValues={intialValues}
            validationSchema={schema}
            onSubmit={login}
        >
            {({ handleSubmit }) => (
                <>     <Form className='w-full h-full flex flex-col justify-between pb-3'>
                    <div className='grid gap-y-4'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <Field className="input input-bordered w-full max-w-xs" name="email" type="text" />
                            <p className='text-Red text-xs font-semibold'>
                                <ErrorMessage name="email" />
                            </p>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password:</span>
                            </div>
                            <Field className="input input-bordered w-full max-w-xs" name="password" type="password" />
                            <p className='text-Red text-xs font-semibold'>
                                <ErrorMessage name="password" />
                            </p>
                        </label>

                    </div>
                    <div className='flex justify-center'>
                        <Button color='primary' size='wide' onClick={handleSubmit} text={"Sign In"} />
                    </div>
                </Form>
                </>
            )}
        </Formik>
    )
}

export default SignIn