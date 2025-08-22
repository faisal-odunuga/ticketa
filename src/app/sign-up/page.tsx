"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/form-input/FormInput";
import { signInWithGoogle, userSignUp } from "@/services/apiAuth";
import { SignUpFormValues } from "@/hooks/definitions";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (formData) => {
    const { error } = await userSignUp(formData);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created successfully! Please log in.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="bg-gray-100 w-full md:w-1/3 h-fit shadow-sm p-6 md:p-8 space-y-4 rounded-lg">
        <header className="space-y-4">
          <h2 className="text-3xl font-bold">Create your account</h2>
          <p className="text-[#7b7b7b] text-sm">
            Already have an account?
            <Link
              href={"/login"}
              className="text-[#395df5] hover:cursor-pointer"
            >
              {" Sign in"}
            </Link>
          </p>
          {/* {error && <h1 className="text-xl text-red-500">Error Test</h1>} */}
        </header>

        <main className="space-y-5">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Name */}
              <FormInput
                id="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                required
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              {/* Email */}
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

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <FormInput
                id="password"
                label="Password"
                isPasswordType={true}
                placeholder="Enter your password"
                required
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="w-full text-sm"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              btnText={isSubmitting ? "Creating Account..." : "Sign Up"}
              loading={isSubmitting}
              className={"w-full"}
            />
          </form>

          <div>
            <h1 className="text-center">OR</h1>
          </div>
          <div className="mt-4">
            <Button
              btnText="Sign Up With Google"
              onClick={signInWithGoogle}
              className="w-full"
            />
          </div>
        </main>
      </section>
    </div>
  );
};

export default SignUp;
