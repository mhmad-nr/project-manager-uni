import { TypeForm, stageType } from "../../types";
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { Button } from "../../components";
const englishRegex = /^[A-Za-z]+$/;

type TypePorp = {
    change: () => void
}

type TypeState = {
    imgUrl: string,
    modalStage: stageType,
    errorText: string,
}
const intialValues: TypeForm<File> = {
    fullName: "",
    discription: "",
    img: new File([""], "")
}
const Schema = Yup.object().shape({
    fullName: Yup.string()
        .min(3, "Your full name must be at least 3 characters")
        .matches(englishRegex, "FullName must be in English ")
        .required("Full name is required"),
    discription: Yup.string()
        .min(0)
        .matches(englishRegex, "Discription must be in English "),

    img: Yup.mixed().required("File must be specified")
})

const SingUp = ({ change }: TypePorp) => {


    const signup = () => {

    }
    return (
        <>

            <Formik
                initialValues={intialValues}
                validationSchema={Schema}
                onSubmit={signup}
            >
                {({
                    errors,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting
                }) => (
                    < Form >
                        <div className='w-full flex mt-4 flex-col gap-y-4'>
                            <Field
                                className={`w-full text-base text-C4c font-light p-3 border-2 outline-none focus_border-Cye rounded-md ${errors.fullName ? "border-Red" : " border-C4"}`}
                                type="text"
                                name="fullName"
                                placeholder="Email" />

                            {/* <ErrorMessage name="fullName" render={toast} /> */}
                            <Field
                                className={`w-full  outline-none text-C4c focus_border-Cye p-3 font-light border-2 rounded-md resize-none ${errors.discription ? "border-Red" : "border-C4"}`}
                                as="textarea"
                                name="discription"
                                placeholder="Description" />
                            {/* <ErrorMessage name="discription" render={toastFun} /> */}

                        </div>
                        <div className='mt-4'>
                            <Button disable={isSubmitting} type='colored' buttonStyle='full' buttonText='White' color='bg-Cye' text={`Sign up`} onClick={handleSubmit} />
                        </div>
                    </Form>
                )}
            </Formik>
        </>

    )
}
export default SingUp

