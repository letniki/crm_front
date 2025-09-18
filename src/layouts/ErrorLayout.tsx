import {FC} from "react";
import ErrorPage from "../pages/ErrorPage";
import HeaderComponent from "../components/HeaderComponent";

const ErrorLayout: FC = () => {
    const isAuthed: boolean = !!localStorage.getItem("accessToken");

    return (
        <div>
            { isAuthed && <HeaderComponent/> }
            <ErrorPage/>
        </div>
    );
};

export default ErrorLayout;