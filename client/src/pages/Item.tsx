import { useEffect, useRef, useState } from 'react'
import { Button, Card, MyDate, Empty, Skeleton, Status } from '../component'
import { StatusEnum } from '../types/common.type'
import { Modal } from '../component'
import { ReactComponent as NewSvg } from '../assets/icons/new.svg'
import { ReactComponent as TasksSvg } from '../assets/icons/tasks.svg'
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import { getNextStatus, getRole, sortByStatus, toastFun } from '../util'
import { Project, Task } from '../service'
import { ProjectType, TaskType, UserType, storeType } from '../types'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DatePicker from "react-datepicker";
import * as Yup from 'yup'
import "react-datepicker/dist/react-datepicker.css";



const project = {
    title: "project title",
    description: "project descriptiondescriptiondescriptiondescriptiondescriptiondescription",

}
const initAddUser = {
    email: ""
}
const schemaAddUser = Yup.object().shape({
    email: Yup.string().email("the Email format is not correct").required("Email is required"),
})
const intialValuesLogin = {
    title: "",
    description: "",
    ends: new Date(),
    hasEnd: false
}
const schemaLogin = Yup.object().shape({
    title: Yup.string().required("The title Field is required"),
    description: Yup.string().min(10, "The Description Field must be more than 10 char").required("The description Field is required"),
    ends: Yup.date().min(new Date(), "End Time must be after now").notRequired(),
    hasEnd: Yup.boolean().notRequired()
})
type stateType = {
    tasks: TaskType[],
    users: UserType[],
    currentEmail: string

} & ProjectType

const Projects = () => {
    const { id } = useParams()
    const isManager = useSelector<storeType>((store) => store.isManager)

    const [state, setState] = useState<stateType>({
        id: "id",
        title: project.title,
        description: project.description,
        users: [],
        tasks: [],
        currentEmail: ""
    })
    const [user, setUser] = useState({
        addEmail: "",
        removeEmail: "",
    })
    const [task, setTask] = useState<{
        item: TaskType,
        tasks: TaskType[],
        addEmail: string
    }>({
        item: {
            createdAt: "",
            description: "",
            id: "",
            status: StatusEnum.IN_PROGRESS,
            title: "",
        },
        tasks: [],
        addEmail: "",
    })

    if (!id) return

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const project = getProject()
        const items = isManager ? getUsers() : getTasks()

        Promise.all([project, items]).then((values) => {
            const [project, items] = values
            if (isManager) {
                setState({ ...state, users: items?.data as UserType[], ...project.data })

            } else {
                setState({ ...state, ...project.data, tasks: sortByStatus(items?.data as TaskType[]) })
            }

        });
    }, [])

    const listTasksRef = useRef<HTMLDialogElement>(null)
    const seeTaskRef = useRef<HTMLDialogElement>(null)
    const createTaskRef = useRef<HTMLDialogElement>(null)
    const addUserRef = useRef<HTMLDialogElement>(null)
    const removeUserRef = useRef<HTMLDialogElement>(null)

    const seeTask = async (id: string) => {
        const { data } = await Task().getById(id)
        console.log(data);
        setTask({ ...task, item: data })

        seeTaskRef.current?.showModal()

    }
    const navigate = useNavigate()

    const getProject = async () => await Project().getById(id)

    const getTasks = async () => await Task().get({ projectId: id })
    const getUsers = async () => await Project().getUsers(id)

    // const getUsers = async () => await Project().getUsers(id)


    const createTask = async (value: {
        title: string, description: string, ends: Date
    }) => {
        const { title, description, ends } = value
        try {
            if (!id) return

            const res = await Task().create({
                title,
                description,
                endedAt: ends,
                projectId: id,
                userEmail: task.addEmail
            })
            toastFun("Task created successfully")
            createTaskRef.current?.close()

        } catch (error) {
            console.log(error);
        }
    }
    const addUser = async ({ email }: { email: string }) => {
        if (!id) return

        try {
            await Project().addUser(id, { email })
            toastFun(`${email} added successfully`)
            addUserRef.current?.close()
            setTimeout(() => navigate(0), 3500)

        } catch (error) {

        }
    }
    const deleteUser = async () => {
        if (!id) return

        try {
            await Project().deleteUser(id, { email: user.removeEmail })
            toastFun(`${user.removeEmail} removed successfully`)
            removeUserRef.current?.close()
            setTimeout(() => navigate(0), 3500)
        } catch (error) {

        }
    }
    const setCurrentUser = async (removeEmail: string) => {
        setUser({ ...user, removeEmail })
        removeUserRef.current?.showModal()
    }
    const clearCurrentUser = async () => {
        setUser({ ...user, removeEmail: '' })
        removeUserRef.current?.close()
    }
    const tasksList = async (email: string) => {
        listTasksRef.current?.showModal()
        const { data } = await Task().get({ projectId: id, userEmail: email })
        setTask({ ...task, tasks: data })
    }
    const openAddTask = (email: string) => {
        setTask({ ...task, addEmail: email })
        createTaskRef.current?.showModal()
    }
    const changeTaskStatus = async (taskId: string, status: StatusEnum) => {
        const newStatus = getNextStatus(status)
        await Task().update(taskId, { status: newStatus })
        toastFun("Task updated successfully")
        seeTaskRef.current?.close()
        setTimeout(() => navigate(0), 3000)
    }
    return (
        <>
            <Modal style='w-[650px] min-w-[650px]' ref={listTasksRef} >

                <div className="w-full flex justify-between items-center">
                    <h2 className='font-semibold border-b-2 pb-1'>User tasks</h2>
                    <Button
                        icon={<CloseSvg />}
                        text=''
                        color='default'
                        size='sm'
                        onClick={() => listTasksRef.current?.close()} />
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task.tasks.map(({ id, description, status, title }, i) => <>
                                <tr key={id}>
                                    <th>{i + 1}</th>
                                    <th>{title}</th>
                                    <td>{description}</td>
                                    <td><Status status={status} /></td>

                                </tr>
                            </>)}
                        </tbody>
                    </table>
                    {state.users.length == 0 && <div className='h-28'><Empty text='No one added yet' /></div>}
                </div>



            </Modal>
            <Modal ref={removeUserRef} >
                <h1>Are you sure?</h1>
                <h2>remove "{user.removeEmail}" from project</h2>
                <div className='w-full flex justify-between items-center'>
                    <Button text='close' color='default' size='sm' onClick={clearCurrentUser} />
                    <Button color='accent' size='sm' onClick={deleteUser} text={"Remove"} />
                </div>
            </Modal>
            <Modal ref={createTaskRef} >
                <h2 className='text-center font-bold'>Add Task</h2>
                <Formik
                    initialValues={intialValuesLogin}
                    validationSchema={schemaLogin}
                    onSubmit={createTask}
                >
                    {({ handleSubmit, errors, values, setFieldValue }) => (
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
                                <div>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <span className="label-text">Has End Time</span>
                                            <Field type="checkbox" name="hasEnd" className="checkbox checkbox-info" />
                                        </label>
                                    </div>
                                </div>
                                {values.hasEnd &&
                                    <label className="form-control">
                                        <div className="label">
                                            <span className="label-text">Ends in:</span>
                                        </div>
                                        <DatePicker selected={values.ends} onChange={(date) => {
                                            console.log(date);

                                            setFieldValue("ends", date)
                                        }} />
                                        <p className='text-Red text-xs font-semibold'>
                                            <ErrorMessage name="ends" />
                                        </p>
                                    </label>
                                }

                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <Button text='close' color='default' size='sm' onClick={() => createTaskRef.current?.close()} />
                                <Button color='accent' size='sm' onClick={handleSubmit} text={"Add"} />
                            </div>
                        </Form></>
                    )}
                </Formik>
            </Modal>
            <Modal ref={addUserRef} >
                <h2 className='text-center font-bold'>Add New Colleague</h2>
                <Formik
                    initialValues={initAddUser}
                    validationSchema={schemaAddUser}
                    onSubmit={addUser}
                >
                    {({ handleSubmit, errors, handleChange }) => (
                        <>     <Form className='w-full h-full flex flex-col justify-between'>
                            <div className='grid gap-y-4 my-3 py-3 border-y border-y-C72'>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Email:</span>
                                    </div>
                                    <Field
                                        type="email"
                                        name="email"
                                        className={`input input-bordered w-full max-w-xs ${errors.email ? "border-Red" : ""}`}
                                        placeholder="Colleague Email..." />
                                    <p className='text-Red text-xs font-semibold'>
                                        <ErrorMessage name="email" />
                                    </p>
                                </label>

                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <Button text='close' color='default' size='sm' onClick={() => addUserRef.current?.close()} />
                                <Button color='accent' size='sm' onClick={handleSubmit} text={"Add"} />
                            </div>
                        </Form></>
                    )}
                </Formik>
            </Modal>
            <Modal ref={seeTaskRef} >
                <div className="w-full flex justify-between items-center">
                    <MyDate createdAt={task.item.createdAt} endDate={task.item.endDate} />
                    <Button
                        icon={<CloseSvg />}
                        text=''
                        color='default'
                        size='sm'
                        onClick={() => seeTaskRef.current?.close()} />
                </div>
                <h1 className='text-lg font-semibold'>{task.item.title}</h1>
                <p className='text-sm'>{task.item.description}</p>
                <p className='text-sm'>{task.item.description}</p>
                <div className='mt-4 flex w-full justify-between'>

                    <label className="flex gap-x-2 items-center ">
                        <div className="label">
                            <span className="label-text">Status:</span>
                        </div>
                        <Status status={task.item.status} />

                    </label>

                    <label className="flex gap-x-2 items-center ">
                        {task.item.status != StatusEnum.DONE && <>
                            <div className="label">
                                <span className="label-text">Change To</span>
                            </div>
                            <Button text={getNextStatus(task.item.status)} color='default' size='xs'
                                onClick={() => changeTaskStatus(task.item.id, task.item.status)} />
                        </>}
                    </label>
                </div>

            </Modal>
            <div className="flex w-full h-full">
                <div className={`flex-1 h-20 ${isManager ? "px-6" : "pl-6"}`}>
                    <div className='pb-8 border-b'>
                        <div className='my-6 w-full flex items-center justify-between'>
                            <h1 className='text-xl font-semibold'>{state.title}</h1>
                            <div className='flex items-center justify-between gap-x-4'>
                                <p className='font-bold'>status:</p>
                                {/* <Status status={state.status} /> */}
                            </div>
                        </div>
                        <p>{state.description}</p>
                    </div>
                    {isManager ? <>

                        <div>
                            <div className='w-full flex items-center justify-between py-6'>
                                <h2 className='text-xl font-semibold'>Colleagues</h2>
                                {isManager ? <>
                                    <Button icon={<NewSvg />} text='Colleague' color='default' size='sm' onClick={() => addUserRef.current?.showModal()} />

                                </> : <></>}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table table-xs">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Joined At</th>
                                            <th>Tasks</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.users.map(({ email, isManager, joinedAt, id }, i) => <>
                                            <tr key={id}>
                                                <th>{i + 1}</th>
                                                <td>{email}</td>
                                                <td>{getRole(isManager)}</td>
                                                <td>2019/10/02</td>
                                                <td>
                                                    <Button icon={<TasksSvg />} text='' color='default' size='xs' onClick={() => tasksList(email)} />
                                                </td>
                                                <td>
                                                    <Button icon={<NewSvg />} text='Task' color='default' size='xs' onClick={() => openAddTask(email)} />
                                                </td>
                                                <td>
                                                    <Button text='Remove User' color='default' size='xs' onClick={() => setCurrentUser(email)} />
                                                </td>
                                            </tr>
                                        </>)}
                                    </tbody>
                                </table>
                                {state.users.length == 0 && <div className='h-28'><Empty text='No one added yet' /></div>}
                            </div>
                        </div>
                    </> : <></>}
                </div>
                {!isManager ? <>
                    <div className="divider divider-horizontal"></div>
                    <div className="pr-6">
                        <div className='mt-3 mb-6 flex w-full justify-between'>
                            <h1 className='text-xl font-semibold'>Tasks</h1>
                            {isManager ? <>
                                <div className=' mb-4'>
                                    <Button icon={<NewSvg />} text='Task' color='default' size='sm' onClick={() => createTaskRef.current?.showModal()} />
                                </div>
                            </> : <></>}
                        </div>
                        {isLoading ? <Skeleton count={3} width='w-96' spacing={"grid gap-y-4"} height='h-[160px]' /> : <>
                            {
                                state.tasks.length > 0 ? state.tasks.map(({ description, status, title, id, createdAt, endDate }) => <div key={id} className='mb-3 w-96'>
                                    <Card.Task
                                        createdAt={createdAt}
                                        endDate={endDate}
                                        id={id}
                                        onClick={() => seeTask(id)}
                                        status={status} title={title} description={description} />
                                </div>) : <>
                                    <div className='w-96 h-44'>
                                        <Empty />
                                    </div>
                                </>
                            }
                        </>}
                    </div>
                </> : <></>}
            </div>
        </>
    )
}

export default Projects