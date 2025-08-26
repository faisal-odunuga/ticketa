import supabase from "@/lib/supabase";

export const verifyPayment = async (reference: string) => {
  const { data, error } = await supabase.functions.invoke("verify-payment", {
    body: { reference },
  });
  if (error) {
    console.error(error);
  }
  const jsonData = typeof data === "string" ? JSON.parse(data) : data;
  return { jsonData, error };
};
