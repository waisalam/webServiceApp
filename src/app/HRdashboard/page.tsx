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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center py-6 px-10 bg-black/40 border-b border-gray-700">
        <div>
          <h1 className="text-3xl text-white tracking-wide">HR Dashboard</h1>
          <p className="text-gray-400">Manage and add employees</p>
        </div>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 py-2 px-4 rounded-lg"
          onClick={() => router.push("/employee-signup")}
        >
          Sign Up Employee
        </Button>
      </header>

      {/* Additional HR dashboard content (optional) */}
      <section className="mt-10 text-gray-300">
        <p className="text-lg">Welcome to your HR panel. Use the button above to add new employees.</p>
      </section>
    </main>
  );
}
