import { Resend } from "resend";
import { NextResponse } from "next/server";
import DownloadTicket from "../../../components/email-template";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Ticketa <onboarding@resend.dev>",
      to: ["faisalodunuga@gmail.com"],
      subject: "Your Ticket is Ready 🎟️",
      html: "<p>Check your email for your ticket</p>", // ✅ string, not Promise
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
