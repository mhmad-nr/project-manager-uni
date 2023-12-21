import React from 'react'
import { Button } from '../component'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  const getStarted = () => {
    navigate("/register");
  }
  return (
    <>
      <section className='w-full h-[calc(100vh-81.6px)] flex justify-center items-center '>
        <div>
          <h1 className='text-center text-6xl font-bold mb-6'>Conquer Your Projects with Us</h1>
          <h2 className='w-[850px] text-left text-3xl font-semibold  bg-orange'>A streamlined and intuitive project management tool that helps you get things done.</h2>
          <div className='w-full flex justify-center mt-8'>
            <Button onClick={getStarted} color='primary' size='md' text='Get Started' />
          </div>
        </div>
      </section>
      <section className='w-full h-[100vh] pt-20 pl-10'>
        <div className='mb-16'>

          <div className='mb-10 '>
            <div>
              <h2 className='w-[850px] border-b-2 text-left text-3xl font-semibold'>Features</h2>
            </div>
          </div>
          <ul className='pl-20 grid gap-y-5'>
            <li className='text-xl font-semibold text-C72 flex items-center gap-x-4'>
              <span className='block w-4 h-4 rounded-full bg-Green'></span>
              <span>
                Easily create and manage projects with a simple drag-and-drop interface.
              </span>

            </li>
            <li className='text-xl font-semibold text-C72 flex items-center gap-x-4'>
              <span className='block w-4 h-4 rounded-full bg-Green'></span>
              <span>
                Collaborate effectively with team members using real-time communication and shared tasks.
              </span>

            </li>
            <li className='text-xl font-semibold text-C72 flex items-center gap-x-4'>
              <span className='block w-4 h-4 rounded-full bg-Green'></span>
              <span>
                Track progress and stay on top of deadlines with clear visualizations and reports.
              </span>

            </li>
          </ul>
        </div>
        <div>
          <div className='mb-10 '>
            <div>
              <h2 className='w-[850px] border-b-2 text-left text-3xl font-semibold'>Benefits</h2>
            </div>
          </div>
          <ul className='pl-20 grid gap-y-5'>
            <li className='text-xl font-semibold text-C72 flex items-center gap-x-4'>
              <span className='block w-4 h-4 rounded-full bg-Red'></span>
              <span>
                Boost productivity and efficiency by organizing your projects with ease.
              </span>

            </li>
            <li className='text-xl font-semibold text-C72 flex items-center gap-x-4'>
              <span className='block w-4 h-4 rounded-full bg-Red'></span>
              <span>
                Enhance team communication and collaboration with a centralized platform.
              </span>

            </li>
            <li className='text-xl font-semibold text-C72 flex items-center gap-x-4'>
              <span className='block w-4 h-4 rounded-full bg-Red'></span>
              <span>
                Achieve project goals on time and within budget with effective planning and management.
              </span>
            </li>
          </ul>
        </div>

      </section>
    </>
  )
}

export default Home