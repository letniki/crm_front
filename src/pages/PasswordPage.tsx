import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPasswordUpdate } from '../interfaces/auth/IPasswordUpdate';
import {SubmitHandler, useForm } from 'react-hook-form';
import { setManagerPassword } from '../services/authService';

const PasswordPage = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<IPasswordUpdate>();

    const onSubmit: SubmitHandler<IPasswordUpdate> = async (data) => {
        try {
            await setManagerPassword(token!, data);
            alert("Password was set. You can now log in using it");
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error("Password setting failed", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-2xl mb-4">Set Your Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {required: true, minLength: 6})}
                    className="border p-2 rounded"
                />
                {errors.password && <span className="text-red-500">password is required (min 6)</span>}

                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                        validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                    className="border p-2 rounded"
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}

                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Activate
                </button>
            </form>
        </div>
    );
};

export default PasswordPage;