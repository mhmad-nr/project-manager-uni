import React, { ReactNode } from 'react'
import { Sidebar } from '../component'

const AuthLayout = ({ page }: { page: ReactNode }) => {
    return (
        <div className='w-full flex h-full'>

            <div className='h-full'>
                <Sidebar />
            </div>
            <div className='flex-1 overflow-y-auto'>
                {page}
            </div>
        </div>
    )
}

export default AuthLayout