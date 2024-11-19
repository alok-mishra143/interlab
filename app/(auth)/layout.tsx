import React, { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-black h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
