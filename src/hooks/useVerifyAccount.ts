import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type VerifyInput = {
  account_number: string;
  bank_code: string;
};

type VerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
};

export function useVerifyAccount(
  options?: UseMutationOptions<VerifyResponse, Error, VerifyInput>
) {
  return useMutation<VerifyResponse, Error, VerifyInput>({
    mutationFn: async ({ account_number, bank_code }: VerifyInput) => {
      const res = await fetch("/api/paystack/verify-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_number, bank_code }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to verify account");
      }

      return res.json();
    },
    ...options,
  });
}
