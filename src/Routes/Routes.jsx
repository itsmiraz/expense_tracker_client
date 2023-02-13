import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Expense from "../Pages/Expense/Expense";
import Settings from "../Pages/Settings/Settings";
import Summary from "../Pages/Summary/Summary";
import Private from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Private><Main /></Private>,
        children: [
            {
                path: '/settings',
                element: <Private><Settings /></Private>

            },
            {
                path: '/summury',
                element:<Private> <Summary /></Private>

            },
            {
                path: '/',
                element: <Private><Expense /></Private>

            },

        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])