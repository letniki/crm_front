import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const MainLayout: FC = () => {

    const isAuthed: boolean = !!localStorage.getItem("accessToken");

    return (
        <div>
            {
                isAuthed &&
                <>
                    <HeaderComponent/>
                    <Outlet/>
                </>
            }
        </div>
    );
};

export default MainLayout;