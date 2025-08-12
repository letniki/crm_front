import React, {FC} from 'react';
import {login} from "../../services/authService";
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

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
            const response = await login(authData);
            navigate("/orders?page=1&order=id&direction=desc");
        }catch (error){
            alert("Login failed. Please try again.");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email", {
                        required: "email required",
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                    })}
                    type="email"
                    placeholder={"admin@gmail.com"}
                />
                {errors.email && <span>{errors.email.message}</span>}

                <input
                    {...register("password", {required: "password required"})}
                    type="password"
                    placeholder={"admin"}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AuthFormComponent;