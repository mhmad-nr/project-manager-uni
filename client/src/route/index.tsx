import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PublicRoutes, AuthRoutes } from './routes';

const MainLayout = lazy(() => import('../layout/MainLayout'));
const AuthLayout = lazy(() => import('../layout/AuthLayout'));


const AppRoute = () => {

    // const { token } = useSelector(store => store.Auth.user);
    const token = true
    return (
        <React.Suspense fallback={<div>div</div>}>
            <Router>
                <Routes>
                    {PublicRoutes.map(({ path, Element }, index) => {
                        return (
                            <Route key={index} path={path} element={<MainLayout page={<Element />} />} />
                        )
                    })}
                    {AuthRoutes.map(({ path, Element }, index) => {
                        if (!token) {
                            return <Route key={index} path={path} element={<Navigate to="/" replace={true} />} />
                        }
                        return (
                            <Route key={index} path={path} element={<MainLayout page={<AuthLayout page={<Element />} />} />} />
                        )
                    })}
                </Routes>
            </Router>

        </React.Suspense>
    )
}

export default AppRoute;