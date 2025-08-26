"use client";

import supabase from "@/lib/supabase";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentData {
  status: string;
  reference: string;
  amount: number;
  paid_at: string;
  metadata: {
    customer_name: string;
    customer_phone: string;
    event_name: string;
  };
}

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Prevent spoofing: trxref must match reference
    if (!trxref || !reference || trxref !== reference) {
      setStatus("error");
      setErrorMessage(
        "Invalid or mismatched transaction reference. Please do not tamper with the URL."
      );
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "verify-payment",
          {
            body: { reference: trxref },
          }
        );

        if (error) {
          setStatus("error");
          setErrorMessage(error.message || "Payment verification failed.");
          return;
        }

        // Parse if string
        const jsonData = typeof data === "string" ? JSON.parse(data) : data;
        const payment = jsonData.data;

        // Ensure this reference is actually successful
        if (payment?.status === "success" && payment.reference === trxref) {
          setPaymentData(payment);
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(
            payment?.message || "Payment not verified or failed."
          );
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setErrorMessage("Unexpected error during payment verification.");
      }
    };

    verifyPayment();
  }, [trxref, reference]);

  const formatCurrency = (amount: number) =>
    `₦${(amount / 100).toLocaleString()}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center space-y-4">
        {!trxref && (
          <p className="text-red-600 font-semibold">
            No transaction reference found.
          </p>
        )}

        {trxref && (
          <p className="text-gray-700 text-sm">
            Transaction Reference: <span className="font-mono">{trxref}</span>
          </p>
        )}

        {status === "loading" && (
          <p className="text-blue-600 font-medium">Verifying payment...</p>
        )}

        {status === "success" && paymentData && (
          <div className="space-y-2">
            <p className="text-green-600 font-semibold text-lg">
              ✅ Payment Successful
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {paymentData.metadata.customer_name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Event:</span>{" "}
              {paymentData.metadata.event_name}
            </p>
            <p className="text-gray-700">
              Amount Paid: {formatCurrency(paymentData.amount)}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Paid At</span>{" "}
              {new Date(paymentData.paid_at).toLocaleString()}
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-2">
            <p className="text-red-600 font-semibold text-lg">
              ❌ Payment Failed
            </p>
            {errorMessage && <p className="text-gray-700">{errorMessage}</p>}

            <button
              onClick={() => router.back()}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
