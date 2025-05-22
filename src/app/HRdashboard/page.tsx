"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HRDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/signin');
    } else if (session?.user?.role !== 'HR') {
      router.push('/signin');
    }
  }, [session, status, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center p-4 sm:p-6">
      <header className="w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 px-4 sm:px-10 bg-black/40 border-b border-gray-700 gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl text-white tracking-wide">HR Dashboard</h1>
          <p className="text-gray-400">Manage and add employees</p>
        </div>
        <Button
          className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 py-2 px-4 rounded-lg"
          onClick={() => router.push("/employee-signup")}
        >
          Sign Up Employee
        </Button>
      </header>

      <section className="w-full max-w-6xl mt-6 sm:mt-10 px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* ... your grid content ... */}
        </div>
      </section>
    </main>
  );
}
