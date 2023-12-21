"use client";

type ErrorProps = {
  error: {
    message: string;
  };
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className="flex items-center justify-center h-screen w-screen text-white text-2xl">
      Error: {error?.message}
    </div>
  );
}
