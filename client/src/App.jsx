import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';

import './App.scss';
import { Navbar, Footer } from './components';
import {
    Account, Registration, Login, Home, Single, Write, NotFound,
} from './pages';

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/post/:id',
                element: <Single />,
            },
            {
                path: '/write',
                element: <Write />,
            },
            {
                path: '/account',
                element: <Account />,
            },
        ],
    },
    {
        path: '/registration',
        element: <Registration />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
