import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}
const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`rounded-lg border bg-white text-black shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
