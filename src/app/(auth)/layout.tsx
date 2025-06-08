import React from "react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="flex bg-[url('/assets/images/bg-img.png')] bg-cover bg-center bg-no-repeat min-h-screen items-center justify-center min-w-full"
    >
      {children}
    </div>
  );
}
