"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/form-input/FormInput";
import { userLoginIn, signInWithGoogle } from "@/services/apiAuth";
import { SignInFormValues } from "@/hooks/definitions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>();
  const router = useRouter();
  const onSubmit: SubmitHandler<SignInFormValues> = async (formData) => {
    const { error } = await userLoginIn(formData);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login successful!");
    router.push("/dashboard"); // 👈 redirect to dashboard or homepage
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="bg-gray-100 w-full md:w-1/3 h-fit shadow-sm p-6 md:p-8 space-y-4 rounded-lg">
        <header className="space-y-4">
          <h2 className="text-3xl font-bold">Welcome back to Ticketa</h2>
          <p className="text-[#7b7b7b] text-sm">
            Don&apos;t have an account yet?
            <Link
              href={"sign-up"}
              className="text-[#395df5] hover:cursor-pointer"
            >
              {" Create one"}
            </Link>
          </p>
        </header>

        <main className="space-y-5">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormInput
                id="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <FormInput
                id="password"
                label="Password"
                isPasswordType={true}
                placeholder="Enter your password"
                required
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              btnText={isSubmitting ? "Signing In..." : "Sign In"}
              loading={isSubmitting}
              className={"w-full"}
            />
          </form>
          <div>
            <h1 className="text-center">OR</h1>
          </div>
          <div className="mt-4">
            <Button
              btnText="Sign In With Google"
              onClick={signInWithGoogle}
              className="w-full"
            />
          </div>
        </main>
      </section>
    </div>
  );
};

export default SignIn;
