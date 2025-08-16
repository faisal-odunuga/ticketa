import { ButtonHTMLAttributes, ReactNode } from "react";
import { CgSpinnerTwo } from "react-icons/cg";

interface BntProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText?: string;
  className?: string;
  loading?: boolean;
  filled?: boolean;
  hasIcon?: ReactNode;
}
const Button = ({
  btnText,
  className,
  filled = true,
  hasIcon,
  loading = false,
  ...props
}: BntProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background h-10 px-4 py-2 w-fit transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:!cursor-not-allowed ${
        filled
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
      } ${className}`}
      {...props}
      disabled={loading}
    >
      {loading && !hasIcon && (
        <CgSpinnerTwo className="animate-spin" size={16} />
      )}{" "}
      {btnText}
      {hasIcon}
    </button>
  );
};

export default Button;
