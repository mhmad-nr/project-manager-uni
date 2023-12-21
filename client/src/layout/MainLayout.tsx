import { ReactNode } from 'react'
import { Navbar } from '../component'


const MainLayout = ({ page }: { page: ReactNode }) => (
    <>
        <Navbar />
        <div className='w-full h-[calc(100vh-81.6px)]'>
            {page}
        </div>
        {/* <Footer /> */}
    </>

)
export default MainLayout