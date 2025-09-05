import React, {FC} from 'react';
import {login} from "../../services/authService";
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import './AuthFormComponent.css';

interface IFormData {
    email: string,
    password: string
}
const AuthFormComponent: FC = () => {
    const {register, handleSubmit, formState: {errors}}=useForm<IFormData>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormData> = async (data) =>{
        try {
            const {email, password} = data;
            const authData = {email, password};
            await login(authData);
            navigate("/orders?page=1&order=id&direction=desc");
        }catch (error){
            alert("Login failed. Please try again.");
        }
    }
    return (
        <div className="authFormBox">
            <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                <div>
                Email:
                <input
                    {...register("email", {
                        required: "email required",
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                    })}
                    className="loginInput"
                    type="email"
                    placeholder={"admin@gmail.com"}
                /></div>
                {errors.email && <span className="text-danger">{errors.email.message}</span>}

                <div>Password:
                <input
                    {...register("password", {required: "password required"})}
                    className="loginInput"
                    type="password"
                    placeholder={"admin"}

                /></div>
                {errors.password && <span className="text-danger">{errors.password.message}</span>}

                <button type="submit" className="btn btn-success m-2">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AuthFormComponent;