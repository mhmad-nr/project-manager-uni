import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Auth } from '../../service'
import { toastFun } from '../../util'
import { Button } from '../../component'

type valuesType = {
    email: string,
    password: string,
    password_confirm: string,
    is_manager: boolean

}


const intialValues = {
    email: "",
    password: "",
    password_confirm: "",
    is_manager: false

}
const schema = Yup.object().shape({
    email: Yup.string().email("the Email shoud be valid").required("the Email Field is required"),
    password: Yup.string()
        .required("the Password Field is required")
        .matches(
            /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, "the Password should be a valid"),
    password_con: Yup.string()
        .required("Passwords must match")
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    is_manager: Yup.bool() // use bool instead of boolean
        .oneOf([true]),
})

const SignUp = ({ doSignIn }: { doSignIn: () => void }) => {


    const signup = async (value: valuesType) => {
        const { email, password, is_manager } = value
        const req = {
            email,
            password,
            isManager: is_manager ? true : false
        }
        console.log(req);

        try {
            await Auth().signUp(req)
            toastFun("you have signed up successfully")
            setTimeout(() => doSignIn(), 3000)


        } catch (error: any) {
            console.log(error);

            const message = error.response.data.message
            if (Array.isArray(message)) {
                message.map((msg) => {
                    toastFun(msg)
                })
            }
            toastFun(error.response.data.message)
        }

    }
    return (
        <Formik
            initialValues={intialValues}
            validationSchema={schema}
            onSubmit={signup}
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
                            {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}
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
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Confirm Password:</span>
                            </div>
                            <Field className="input input-bordered w-full max-w-xs" name="password_con" type="password" />
                            <p className='text-Red text-xs font-semibold'>
                                <ErrorMessage name="password_con" />
                            </p>
                        </label>
                        <div>
                            <label className="cursor-pointer label">
                                <span className="label-text">I AM MANAGER:</span>
                                <Field type="checkbox" name="is_manager" className="checkbox checkbox-info" />
                            </label>

                        </div>

                    </div>
                    <div className='flex justify-center'>
                        <Button color='primary' size='wide' onClick={handleSubmit} text={"Sign Up"} />
                    </div>
                </Form></>
            )}
        </Formik>
    )
}

export default SignUp