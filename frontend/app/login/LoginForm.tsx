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
import jwt from "jsonwebtoken";
import { useUserContext } from "../context/userContext";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setRole, setIsExpired } = useUserContext();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, data, { withCredentials: true });
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Decode the token and update the context
      const decoded = jwt.decode(token) as { role: string; exp: number };
      setRole(decoded.role);
      setIsExpired(decoded.exp < Date.now() / 1000);

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

export default Login;
