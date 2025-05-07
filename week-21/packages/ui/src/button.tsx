"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={() => onClick()}
      style={{
        width: 260,
        padding: 10,
        borderRadius: 10,
        border: 1,
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
};
