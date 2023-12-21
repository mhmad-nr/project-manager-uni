import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Input, Skeleton, Status } from '../component'
import { StatusEnum } from '../types/common.type'
import { Modal } from '../component'
import { ReactComponent as NewSvg } from '../assets/icons/new.svg'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toastFun } from '../util'
import { Project, Task } from '../service'
import { CreateProjectType, ProjectType, TaskType, errorAxiosType, storeType } from '../types'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const card = {
    title: "card title",
    description: "descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription"
}
// const card = {
//     email: "mohammadnorouzi@gmail.com",
// }
const project = {
    title: "project title",
    description: "project descriptiondescriptiondescriptiondescriptiondescriptiondescription",

}
const intialValuesLogin = {
    title: "",
    description: ""
}
const schemaLogin = Yup.object().shape({
    title: Yup.string().required("The title Field is required"),
    description: Yup.string().min(10, "The Description Field must be more than 10 char").required("The description Field is required"),
})
type stateType = {
    tasks: TaskType[]
} & ProjectType

const Projects = () => {
    const { id } = useParams()
    const isManager = useSelector<storeType>((store) => store.isManager)

    const [state, setState] = useState<stateType>({
        id: "id",
        title: project.title,
        description: project.description,
        tasks: [],
        status: StatusEnum.DONE,
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getProject()
    }, [])
    const getProject = async () => {
        if (!id) return

        try {
            const { data } = await Project().getById(id)

            setState({ ...state, ...data })

        } catch (error) {
            const { statusCode } = error as errorAxiosType

        }
    }

    const getTasks = async () => {
        try {
            const { data } = await Task().get({})
            // setState({ ...state, sides: data })

        } catch (error) {
            const { statusCode } = error as errorAxiosType

        }

    }
    const ref = useRef<HTMLDialogElement>(null)
    // const isManager = false



    const createProject = async (value: CreateProjectType) => {
        try {
            const res = await Project().create(value)

        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className="flex w-full h-full">

            <div className="flex-1 h-20 pl-6">
                <div className='my-6 w-full flex items-center justify-between'>
                    <h1 className='text-xl font-semibold'>{state.title}</h1>
                    <div className='flex items-center justify-between gap-x-4'>
                        <p className='font-bold'>status:</p>
                        <Status status={state.status} />
                    </div>
                </div>
                <p>{state.description}</p>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="pr-6">
                <div className='mt-3 mb-6 flex w-full justify-between'>
                    <h1 className='text-xl font-semibold'>Tasks</h1>
                    {isManager ? <>
                        <div className=' mb-4'>
                            <Button icon={<NewSvg />} text='Task' color='default' size='sm' onClick={() => ref.current?.showModal()} />
                        </div>
                        <Modal ref={ref} >
                            <h2 className='text-center font-bold'>Create New Project</h2>
                            <Formik
                                initialValues={intialValuesLogin}
                                validationSchema={schemaLogin}
                                onSubmit={createProject}
                            >
                                {({ handleSubmit, errors, handleChange }) => (
                                    <>     <Form className='w-full h-full flex flex-col justify-between'>
                                        <div className='grid gap-y-4 my-3 py-3 border-y border-y-C72'>

                                            <label className="form-control w-full max-w-xs">
                                                <div className="label">
                                                    <span className="label-text">Title:</span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="title"
                                                    className={`input input-bordered w-full max-w-xs ${errors.title ? "border-Red" : ""}`}
                                                    placeholder="Project Title..." />
                                                <p className='text-Red text-xs font-semibold'>
                                                    <ErrorMessage name="title" />
                                                </p>

                                            </label>
                                            <label className="form-control">
                                                <div className="label">
                                                    <span className="label-text">Description:</span>
                                                </div>
                                                <Field
                                                    as="textarea"
                                                    name='description'
                                                    className={`textarea textarea-bordered resize-none h-24 ${errors.description ? "border-Red" : ""}`}
                                                    placeholder="Project Description..."
                                                />
                                                <p className='text-Red text-xs font-semibold'>
                                                    <ErrorMessage name="description" />
                                                </p>
                                            </label>
                                        </div>
                                        <div className='w-full flex justify-between items-center'>
                                            <Button text='close' color='default' size='sm' onClick={() => ref.current?.close()} />
                                            <Button color='accent' size='sm' onClick={handleSubmit} text={"Create"} />
                                        </div>
                                    </Form></>
                                )}
                            </Formik>
                        </Modal>
                    </> : <></>}
                </div>
                {isLoading ? <Skeleton count={3} width='w-96' spacing={"grid gap-y-4"} height='h-[160px]' /> : <>
                    {
                        state.tasks.length > 0 ? state.tasks.map(({ }) => <>
                            <div className='mb-3 w-96'>
                                <Card.Item type='task' id='id' project_id='project_id' createdAt='sdasd' status={StatusEnum.DONE} title={"title"} description={"description"} />
                            </div>
                        </>) : <>
                            <div className='w-96 h-44'>
                                <div className='w-full h-full rounded-3xl border border-dashed flex justify-center items-center'>
                                    <h2>Empty</h2>
                                </div>
                            </div>
                        </>
                    }
                </>}
            </div>
        </div>
    )
}

export default Projects