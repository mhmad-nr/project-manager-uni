import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainLayout } from './layouts';

const Home = lazy(() => import('./pages/Home'));


const AppRoute = () => {


    return (
        <>
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/profile/:address" element={<Profile />} />
                        <Route path="/buycoffee/:address" element={<BuyCoffee />} />
                        <Route path="/authpage" element={<AuthPage />} />
                        <Route path='*' element={<NotFound />} /> */}
                    </Routes>
                </MainLayout>
            </Router>
        </>
    )
}

export default AppRoute;

