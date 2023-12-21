import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as ProjectSvg } from '../assets/icons/project.svg'
import { ReactComponent as ProfileSvg } from '../assets/icons/profile.svg'

export const Sidebar = () => {
    return (
        <div className="drawer lg:drawer-open h-full">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side h-full">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-56 h-full bg-base-200 text-base-content">
                    <li>
                        <NavLink to={"/project"}>
                            <ProjectSvg />
                            <span className='font-semibold'>Project</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/profile"}>
                            <ProfileSvg />
                            <span className='font-semibold'>Profile</span>
                        </NavLink>
                    </li>

                </ul>

            </div>
        </div>
    )
}

