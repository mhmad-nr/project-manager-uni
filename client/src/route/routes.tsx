import { lazy } from "react";
const Profile = lazy(() => import('../pages/Profile'));
const Item = lazy(() => import('../pages/Item'));
const Projects = lazy(() => import('../pages/Projects'));
const Home = lazy(() => import('../pages/Home'));
const LoginRigester = lazy(() => import('../pages/LoginRegister'));
const AddContactInfo = lazy(() => import('../pages/AddContactInfo'));
const NotFound = lazy(() => import('../pages/404Page'));

const PublicRoutes = [
    {
        path: "*",
        Element: NotFound
    },
    {
        path: "/",
        Element: Home
    },
    {
        path: "/register",
        Element: LoginRigester
    },
    {
        path: "/add-contact-info",
        Element: AddContactInfo
    },


]
const AuthRoutes = [
    {
        path: "*",
        Element: NotFound
    },
    {
        path: "/project",
        Element: Projects
    },
    {
        path: "/profile",
        Element: Profile
    },
    {
        path: "/project/:id",
        Element: Item
    },

]
export { AuthRoutes, PublicRoutes };