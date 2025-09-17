import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import QRCode from "npm:qrcode"; // ✅ must use npm: prefix

serve(async (req) => {
  const { text } = await req.json();
  const qr = await QRCode.toDataURL(text);

  return new Response(JSON.stringify({ qr }), {
    headers: { "Content-Type": "application/json" },
  });
});
