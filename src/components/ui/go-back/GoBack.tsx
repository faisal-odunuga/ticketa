"use client";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const GoBack = () => {
  const router = useRouter();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div
        onClick={handleGoBack}
        className="cursor-pointer flex gap-2 items-center justify-center w-fit bg-white border p-2 rounded-md hover:border-gray-300"
      >
        <span>
          <IoChevronBackOutline />
        </span>
        <span>Go Back</span>
      </div>
    </>
  );
};

export default GoBack;
