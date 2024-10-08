"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import Title from "./ui/Title";
import Button from "./ui/Button";

type LoginValuesType = { email: string; password: string };

const LoginForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginSchema = z.object({
    email: z.string().email({ message: "An email is required" }),
    password: z.string().min(1, { message: "Insert your password" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginValuesType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (values: LoginValuesType) => {
    setLoading(true);
    const { email, password } = values;
    try {
      setError(false);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res && res.status === 200) {
        return router.replace("/profile");
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {}
    console.log("There was an error, please try again");
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg py-10 px-8 w-full rounded-lg border-t-4 border-primary max-w-[365px]">
        <Title fontSize="text-xl font-bold" className="my-4" h="h1">
          Login with your credentials
        </Title>
        <form
          ref={form}
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-3"
        >
          <label htmlFor="email" className="font-medium mb-2">
            Email
          </label>
          <input
            className="border border-mediumGray py-2 px-6 rounded-md"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p aria-describedby="email" className="text-red pt-1">
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="password" className="font-medium mb-2">
            Password
          </label>
          <div className="flex gap-2 items-center">
            <input
              className="border border-mediumGray py-2 px-6 rounded-md"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              {...register("password")}
            />
            <BiShow
              onClick={() => setShowPassword(true)}
              className={`h-8 w-8 ${showPassword && "hidden"}`}
            />
            <BiHide
              onClick={() => setShowPassword(false)}
              className={`h-8 w-8 ${!showPassword && "hidden"}`}
            />
          </div>
          {errors.password?.message && (
            <p aria-describedby="password" className="text-red pt-1">
              {errors.password?.message}
            </p>
          )}
          {error && <p className="text-red pt-1">Wrong email or password</p>}
          <Button className="mt-4" loading={loading} submit label="Login" />
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Do not have an account ?<span className="underline"> Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
