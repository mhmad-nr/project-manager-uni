import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Skeleton } from '../component'
import { StatusEnum } from '../types/common.type'
import { Modal } from '../component'
import { ReactComponent as NewSvg } from '../assets/icons/new.svg'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toastFun } from '../util'
import { Project, Task } from '../service'
import { CreateProjectType, ProjectType, TaskType, errorAxiosType, storeType } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



type stateType = {
  projects: ProjectType[],
  tasks: TaskType[],

}
const intialValuesLogin = {
  title: "",
  description: ""
}
const schemaLogin = Yup.object().shape({
  title: Yup.string().required("The title Field is required"),
  description: Yup.string().min(10, "The Description Field must be more than 10 char").required("The description Field is required"),
})
const Projects = () => {

  const [state, setState] = useState<stateType>({
    tasks: [],
    projects: []
  })

  const [isLoading, setIsLoading] = useState({
    project: false,
    card: false
  })

  const isManager = useSelector<storeType>((store) => store.isManager)
  const navigate = useNavigate()

  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {

    getData()

  }, [])

  const getData = async () => {
    try {
      const { data: projects } = await Project().getAll("")
      const { data: tasks } = await Task().get({})
      setState({ ...state, tasks, projects })

    } catch (error) {
      const { statusCode } = error as errorAxiosType
      if (statusCode) {
        navigate("/profile")
      }
    }
  }

  const createProject = async (value: CreateProjectType) => {
    try {
      await Project().create(value)
      ref.current?.close()
      toastFun("Project has been created")
    } catch (error) {
      const { statusCode } = error as errorAxiosType
      console.log(error);

    }
  }

  return (
    <div className="flex w-full h-full">
      {isManager ?
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
        : <></>}
      <div className="flex-1  h-full overflow-y-auto px-4">
        <div className='mt-3 mb-6'>
          <h1 className='text-xl font-semibold'>Projects</h1>
        </div>
        {isManager ?
          <div className='flex w-full justify-end mb-4'>
            <Button icon={<NewSvg />} text='Project' color='default' size='sm' onClick={() => ref.current?.showModal()} />
          </div> : <></>
        }
        {state.projects.length == 0 && <>
          <div className='w-full h-44'>
            <div className='w-full h-full rounded-3xl border border-dashed flex justify-center items-center'>
              <h2>Empty</h2>
            </div>
          </div>
        </>}

        <div className='w-full grid grid-cols-3 gap-x-4 gap-y-6'>

          {state.projects.length != 0 && state.projects.map(({ title, id }) => <div key={id} className='mb-3 flex-1'>
            <Card.Project id={id} status={StatusEnum.DONE} title={title} onClick={() => navigate("/project/" + id)} />
          </div>)}
        </div>
      </div>


    </div>
  )
}

export default Projects