"use client";

import Button from "@/components/ui/button/Button";
import { useParams } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  //   reset: () => void;
}
export default function Error({ error }: ErrorProps) {
  const { id } = useParams();
  console.log(String(id));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">
        Error getting product {id}
      </h1>
      <p className="mt-4 text-gray-600">{error.message}</p>
      <Button onClick={() => window.location.reload()} btnText="Try Again" />
    </div>
  );
}
