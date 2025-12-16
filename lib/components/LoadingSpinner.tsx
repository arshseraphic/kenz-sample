"use client";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({ 
  message = "Loading...", 
  size = "lg" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16", 
    lg: "h-32 w-32"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F1EB]">
      <div className="text-center">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-[#E78200] mx-auto`}></div>
        <p className="mt-4 text-[#272622] text-lg">{message}</p>
      </div>
    </div>
  );
}