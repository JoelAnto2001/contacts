import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/users/login', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register('email', { required: true })} placeholder="Email" />
            {errors.email && <span>Email is required</span>}
            <input type="password" {...register('password', { required: true })} placeholder="Password" />
            {errors.password && <span>Password is required</span>}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
