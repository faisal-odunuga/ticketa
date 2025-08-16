import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  inputStyle?: string;
  id?: string;
  isPasswordType?: boolean;
}

const SelectInput = ({
  children,
  className = "",
  label,
  id,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col text-sm space-y-1">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={`px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm ${className}`}
        id={id}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
