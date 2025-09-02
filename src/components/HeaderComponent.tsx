import React, {FC} from 'react';
import { Button } from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';

const HeaderComponent: FC = () => {

    const navigate = useNavigate();
    // const username = getUserName();
    // const role = getUserRole();
    // const isAdmin = role === "ROLE_ADMIN";

    const onLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div className="d-flex justify-content-end align-items-center bg-success-subtle shadow-sm">
            {/*<ul className="d-flex flex-row align-items-center w-auto list-unstyled mb-0">*/}
            {/*    <li className="pe-2 ps-2">*/}
            {/*        <p className="fs-5 m-auto">Current user: {} </p>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <Button className="btn btn-success m-2 fs-6" onClick={onLogout}>Log out</Button>*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </div>
    );
};

export default HeaderComponent;