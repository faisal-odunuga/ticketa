import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  inputStyle?: string;
  boxStyle?: string;
  isPasswordType?: boolean;
}
const FormInput = ({
  label,
  required = false,
  inputStyle = "",
  boxStyle = "",
  isPasswordType,
  ...others
}: InputProps) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <div className={`w-full space-y-1 ${boxStyle}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm ${inputStyle}`}
          type={isPasswordType ? (isPassword ? "password" : "text") : "text"}
          {...others}
        />
        {isPasswordType && (
          <span
            onClick={() => setIsPassword(!isPassword)}
            className="absolute right-4 top-3"
          >
            {isPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
