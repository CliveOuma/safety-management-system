"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:10000/api/login', data, { withCredentials: true });
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      toast.success('Logged In Successfully');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Sign in" />
      <Button outline label="Continue with Google" icon={AiOutlineGoogle} />
      <hr className="bg-slate-300 w-full h-px" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
        <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
        <Button label="Log in" type="submit" isLoading={isLoading} />
      </form>
      <p className="text-sm">
        Create an account? <Link className="underline text-blue-600" href="/register">Sign Up</Link>
      </p>
    </>
  );
};

export default LoginForm;
