import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { useAuthStore } from '../store/auth.store';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface LoginInput {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>();
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginInput) => {
    const res = await api.post('/auth/login', data);
    const { token, user } = res.data as { token: string; user: User };
    setAuth({ token, user });
    navigate('/services');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input className="w-full border p-2" type="email" {...register('email', { required: true })} />
          {errors.email && <p className="text-red-600 text-sm">Email is required</p>}
        </div>
        <div>
          <label>Password</label>
          <input className="w-full border p-2" type="password" {...register('password', { required: true })} />
          {errors.password && <p className="text-red-600 text-sm">Password is required</p>}
        </div>
        <button disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;