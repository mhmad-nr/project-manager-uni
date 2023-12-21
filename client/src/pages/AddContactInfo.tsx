import { useEffect, useState } from 'react'
import { Button } from '../component'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ContactInfoType, errorAxiosType } from '../types'
import { ContactInfo } from '../service'
import { useNavigate } from 'react-router-dom'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const intialValuesLogin = {
    address: "",
    phone: ""
}
const schemaLogin = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    address: Yup.string().min(10, "The Description Field must be more than 10 char").required("The address Field is required"),
})

const AddContactInfo = () => {
    const [state, setState] = useState({
        phone: '',
        address: "",
    })
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {

        setIsLoading(true)

    }, [])

    const addContactInfo = async ({ address, phone }: ContactInfoType) => {
        // console.log({ address, phone });
        console.log(address, phone);

        try {
            const res = await ContactInfo().add({ address, phone: "+98" + phone })
            navigate("/profile")

        } catch (err) {
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <div className="flex w-full min-h-full py-6">
            <div className="flex-1 flex justify-center">
                <div>

                    <div className='mt-3 mb-6'>
                        <h1 className='text-xl font-semibold'>Add Contact Info</h1>
                    </div>
                    <Formik
                        initialValues={intialValuesLogin}
                        validationSchema={schemaLogin}
                        onSubmit={addContactInfo}
                    >
                        {({ handleSubmit, errors }) => (
                            <>
                                <Form className='w-full  flex flex-col justify-between'>
                                    <div className='grid gap-y-4 my-3 py-3 '>

                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text">Phone:</span>
                                            </div>

                                            <div className='relative'>
                                                <Field
                                                    name="phone"
                                                    className={`pl-[29px] input input-bordered w-full max-w-xs ${errors.phone ? "border-Red" : ""}`}
                                                    placeholder="Enter phone number" />
                                                <span className='absolute top-[13px] left-0'>+98</span>
                                            </div>
                                            {/* <Field
                                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                type="tel"
                                                name="phone"
                                                className={`input input-bordered w-full max-w-xs ${errors.phone ? "border-Red" : ""}`}
                                                placeholder="Project Title..." /> */}
                                            <p className='text-Red text-xs font-semibold'>
                                                <ErrorMessage name="phone" />
                                            </p>
                                        </label>


                                        <label className="form-control">
                                            <div className="label">
                                                <span className="label-text">Address:</span>
                                            </div>
                                            <Field
                                                as="textarea"
                                                name='address'
                                                className={`textarea textarea-bordered resize-none h-24 ${errors.address ? "border-Red" : ""}`}
                                                placeholder="Address"
                                            />
                                            <p className='text-Red text-xs font-semibold'>
                                                <ErrorMessage name="address" />
                                            </p>
                                        </label>
                                    </div>
                                    <div className='flex justify-end'>
                                        <Button isOutlined onClick={handleSubmit} size='wide' color='primary' text='Edite Address' />
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>

                </div>

            </div>
        </div>
    )
}

export default AddContactInfo