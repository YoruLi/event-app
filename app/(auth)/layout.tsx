import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-fixed">
      {children}
    </div>
  );
}
