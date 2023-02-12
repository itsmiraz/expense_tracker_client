import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Expense from "../Pages/Expense/Expense";
import Settings from "../Pages/Settings/Settings";
import Summary from "../Pages/Summary/Summary";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/settings',
                element: <Settings />

            },
            {
                path: '/',
                element: <Summary />

            },
            {
                path: '/expense',
                element: <Expense />

            }
        ]
    }
])