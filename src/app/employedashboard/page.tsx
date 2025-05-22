"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EmployeeDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/signin');
    } else if (session?.user?.role !== 'Employee') {
      router.push('/signin');
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== 'Employee') {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center p-4 sm:p-6">
      <header className="w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 px-4 sm:px-10 bg-black/40 border-b border-gray-700 gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl text-white tracking-wide">Employee Dashboard</h1>
          <p className="text-gray-400">View and manage your tasks</p>
        </div>
        <Button
          className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border border-transparent hover:border-white transition-all duration-500"
          onClick={() => router.push("/profile")}
        >
          My Profile
        </Button>
      </header>

      <section className="w-full max-w-6xl mt-6 sm:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl text-white mb-4">My Tasks</h2>
            {/* Add task list */}
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl text-white mb-4">Recent Activities</h2>
            {/* Add activities */}
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl text-white mb-4">Notifications</h2>
            {/* Add notifications */}
          </div>
        </div>
      </section>
    </main>
  );
}