import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { data } = await axios.post(
      "https://api.paystack.co/subaccount",
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data || "Paystack request failed" },
      { status: error.response?.status || 500 }
    );
  }
}
