import React from 'react';
import {createBrowserRouter, RouteObject} from "react-router-dom";
import ErrorLayout from "../layouts/ErrorLayout";
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import OrdersPage from "../pages/OrdersPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <ErrorLayout/>,
        children: [
            {index: true, element: <AuthPage/>},
            {path: "login", element: <AuthPage/>},
            {path: "orders", element: <OrdersPage/>},
        ],
    },
]

export const router = createBrowserRouter(routes);