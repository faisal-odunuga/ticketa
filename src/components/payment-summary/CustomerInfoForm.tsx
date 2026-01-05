"use client";
import { useFormContext } from "react-hook-form";
import FormInput from "@/components/ui/form-input/FormInput";
import SelectInput from "@/components/ui/select-input/SelectInput";

export default function CustomerInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold">Customer Information</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 px-6 pb-6">
        <FormInput
          label="Full Name"
          {...register("fullName", { required: "Full name is required" })}
        />
        {errors.fullName?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.fullName.message)}
          </p>
        )}

        <FormInput
          label="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}

        <SelectInput
          label="Gender"
          {...register("gender", { required: "Gender is required" })}
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </SelectInput>
        {errors.gender?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.gender.message)}
          </p>
        )}

        <FormInput
          label="Phone Number"
          type="tel"
          {...register("number", { required: "Phone number is required" })}
        />

        {errors.number?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.number.message)}
          </p>
        )}
      </div>
    </div>
  );
}
