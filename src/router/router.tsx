import React from 'react';
import {createBrowserRouter, RouteObject} from "react-router-dom";
import ErrorLayout from "../layouts/ErrorLayout";
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import OrdersPage from "../pages/OrdersPage";
import AuthLayout from '../layouts/AuthLayout';
import CPanelPage from '../pages/CPanelPage';

const routes: RouteObject[] = [
    {
        path: "/",
        element: <AuthLayout/>,
        errorElement: <ErrorLayout/>,
        children: [
            { index: true, element: <AuthPage /> },
            { path: "login", element: <AuthPage /> }
        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorLayout />,
        children: [
            { path: "orders", element: <OrdersPage /> },
            {path: "cpanel", element: <CPanelPage/>}
        ],
    },
];

export const router = createBrowserRouter(routes);