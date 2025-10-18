import React from 'react';
import { Outlet } from 'react-router-dom';
import { getAccessToken } from '../services/tokenService';

const AuthLayout = () => {
    const isAuthed: boolean = !!getAccessToken();
    return (
        <>
        {!isAuthed && <Outlet/>}
        </>
)

};

export default AuthLayout;