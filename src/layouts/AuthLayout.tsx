import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const isAuthed: boolean = !!localStorage.getItem("accessToken");
    return (
        <>
        {!isAuthed && <Outlet/>}
        </>
)

};

export default AuthLayout;