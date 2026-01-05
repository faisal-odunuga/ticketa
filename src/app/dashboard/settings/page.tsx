import PaymentDetailsForm from "@/components/dashboard/payment-details/PaymentDetails";
import React from "react";

const page = () => {
  return (
    <div>
      <h1>Settings</h1>
      <p>Manage your account settings here.</p>
      <PaymentDetailsForm />
    </div>
  );
};

export default page;
