import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1560px] px-6 sm:px-8 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}