"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useBanks } from "@/hooks/useBanks";
import { useVerifyAccount } from "@/hooks/useVerifyAccount";
import FormInput from "@/components/ui/form-input/FormInput";
import SelectInput from "@/components/ui/select-input/SelectInput";

type PaymentFormValues = {
  business_name: string;
  bank_code: string;
  account_number: string;
  percentage_charge: number;
};

export default function PaymentDetailsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PaymentFormValues>();

  const { data: banks, isLoading, isError } = useBanks();
  const [accountName, setAccountName] = useState("");

  // Watch bank + account number
  const bank_code = useWatch({ control, name: "bank_code" });
  const account_number = useWatch({ control, name: "account_number" });

  const {
    mutate: verifyAccount,
    isPending,
    isError: verifyError,
    isSuccess,
    data: verifyData,
  } = useVerifyAccount({
    onSuccess: (data) => setAccountName(data?.data?.account_name ?? ""),
    onError: () => setAccountName(""),
  });

  // Trigger verification once inputs are valid
  useEffect(() => {
    if (bank_code && account_number?.length === 10) {
      verifyAccount({ bank_code, account_number });
    }
  }, [bank_code, account_number, verifyAccount]);

  const onSubmit = async (data: PaymentFormValues) => {
    console.log("Payment details:", { ...data, account_name: accountName });
    // axios POST to your API route here...
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border bg-card shadow-sm w-fit min-w-[400px]"
    >
      {/* Header */}
      <div className="p-6 border-b">
        <h3 className="text-2xl font-semibold">Payment Details</h3>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4 p-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Business Name
          </label>
          <FormInput
            type="text"
            placeholder="Enter business name"
            {...register("business_name", {
              required: "Business name is required",
            })}
          />
          {errors.business_name && (
            <p className="text-red-500 text-sm">
              {errors.business_name.message}
            </p>
          )}
        </div>

        {/* Bank Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Bank</label>
          {isLoading ? (
            <p className="text-gray-500 text-sm">Loading banks...</p>
          ) : isError ? (
            <p className="text-red-500 text-sm">Failed to load banks</p>
          ) : (
            <SelectInput
              {...register("bank_code", { required: "Bank is required" })}
            >
              <option value="">Select a bank</option>
              {banks?.map((bank) => (
                <option key={bank.id} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </SelectInput>
          )}
          {errors.bank_code && (
            <p className="text-red-500 text-sm">{errors.bank_code.message}</p>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Account Number
          </label>
          <FormInput
            type="text"
            maxLength={10}
            placeholder="Enter 10-digit account number"
            {...register("account_number", {
              required: "Account number is required",
              minLength: {
                value: 10,
                message: "Account number must be 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Account number must be 10 digits",
              },
              pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
            })}
          />
          {errors.account_number && (
            <p className="text-red-500 text-sm">
              {errors.account_number.message}
            </p>
          )}

          {/* Show account verification status */}
          {account_number?.length === 10 && bank_code && (
            <p className="text-sm mt-1">
              {isPending ? (
                <span className="text-blue-500">Verifying account...</span>
              ) : verifyError ? (
                <span className="text-red-500">Invalid account</span>
              ) : isSuccess && accountName ? (
                <span className="text-green-600 font-medium">
                  {accountName}
                </span>
              ) : null}
            </p>
          )}
        </div>

        {/* Percentage Charge */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Percentage Charge
          </label>
          <FormInput
            type="number"
            placeholder="e.g. 30"
            {...register("percentage_charge", {
              required: "Percentage charge is required",
            })}
          />
          {errors.percentage_charge && (
            <p className="text-red-500 text-sm">
              {errors.percentage_charge.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="px-6 pb-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {isSubmitting ? "Saving..." : "Save Payment Details"}
        </button>
      </div>
    </form>
  );
}
