"use client";

import React, { useState } from "react";
import axios from "axios";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Heading from "../components/Heading";

interface RegisterFormValues {
  email: string;
  password: string;
  cpassword: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const validateEmail = (email: string) => {
    // Regular expression for validating standard email formats
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Check for minimum length
    return password.length >= 6;
  };

  const onSubmit = async (data: RegisterFormValues) => {
    if (!validateEmail(data.email)) {
      toast.error("Invalid email format");
      return;
    }
    if (data.password !== data.cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!validatePassword(data.password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
  
    setIsLoading(true);
  
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, data);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Heading title="Sign up" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="cpassword"
          label="Confirm Password"
          type="password"
          register={register}
          errors={errors}
          required
        />
        <Button label="Register" type="submit" isLoading={isLoading} />
      </form>
      <p className="text-sm">
        Already registered? <Link className="underline text-blue-600" href="/login">Sign in</Link>
      </p>
    </>
  );
};

export default Register;
