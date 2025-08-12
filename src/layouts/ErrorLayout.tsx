import {FC} from "react";
import ErrorPage from "../pages/ErrorPage";
import HeaderComponent from "../components/HeaderComponent";

const ErrorLayout: FC = () => {
    return (
        <div>
            <HeaderComponent/>
            <ErrorPage/>
        </div>
    );
};

export default ErrorLayout;