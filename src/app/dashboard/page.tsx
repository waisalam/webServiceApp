"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

type HRDetail = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
};

type OrgDetail = {
  id: string;
  name: string;
  description: string;
  industry: string;
  website: string;
  location: string;
  foundedYear?: number;
  contactEmail: string;
  phoneNumber: string;
  teamSize: number;
  socialLinks?: string;
  figmaLink: string;
  domainName: string;
  needWebsite: boolean;
  goals: string;
  mission: string;
  specificFeatures: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [HRdetails, setHRdetails] = useState<HRDetail[]>([]);
  const [showHRList, setShowHRList] = useState(false);
  const [getOrgDetails, setGetOrgDetails] = useState<OrgDetail[]>([]);
  const [showOrgList, setShowOrgList] = useState(false);
  const [message, setMessage] = useState(""); // Add this with your other state declarations

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/signin');
    } else if (session?.user?.role !== 'Admin') {
      router.push('/signin');
    }
  }, [session, status, router]);

  useEffect(() => {
    const getHRdetails = async () => {
      try {
        const res = await axios.get("/api/admin/HRDetails");
        if (res.status === 200) {
          setHRdetails(res.data.getHrDetails);
        }
      } catch (err) {
        console.error("Failed to fetch HRs:", err);
        setHRdetails([]); 
      }
    };

    const getOrgDetails = async () => {
      try {
        const res = await axios.get("/api/admin/orgData");
        if (res.status === 201) {
          setGetOrgDetails(res.data.getOrgData);
        }
      } catch (err) {
        console.error("Failed to fetch organizations", err);
      }
    };

    if (session?.user?.role === 'Admin') {
      getHRdetails();
      getOrgDetails();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== 'Admin') {
    return null;
  }

  const handleNoHRRedirect = () => {
    if (session?.user?.role === 'Admin') {
      setMessage("No HR personnel found. Redirecting to HR signup...");
      setTimeout(() => {
        router.push("/HRsignup");
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-start p-4 sm:p-6">
      <header className="w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 px-4 sm:px-10 bg-black/40 border-b border-gray-700 gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl text-white tracking-wide">Admin Dashboard</h1>
          <p className="text-gray-400">Manage HR, and Create organizations</p>
        </div>
        <Button
          className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border border-transparent hover:border-white transition-all duration-500 py-2 px-4 rounded-xl tracking-wide"
          onClick={(e) => {
            e.preventDefault();
            if (session?.user?.role === 'Admin') {
              router.push("/HRsignup");
            }
          }}
        >
          Sign Up HR
        </Button>
      </header>

      <section className="w-full flex flex-col lg:flex-row mt-6 sm:mt-10 gap-4 sm:gap-8">
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 py-3 px-6 rounded-lg"
            onClick={() => router.push("/createOrg")}
          >
            {showForm ? "Hide Create Org" : "Create Organization"}
          </Button>

          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 py-3 px-6 rounded-lg"
            onClick={() => {
              setShowHRList((prev) => !prev);
              setShowForm(false);
            }}
          >
            {showHRList ? "Hide HR Details" : "Show HR Details"}
          </Button>

          <Button
            className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 py-3 px-6 rounded-lg"
            onClick={() => {
              setShowOrgList((prev) => !prev);
              setShowForm(false);
            }}
          >
            {showOrgList ? "Hide Organizations" : "Show Organizations"}
          </Button>
        </div>

        <div className="w-full lg:w-3/4">
          {showForm && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
              {/* You can add your org creation form here */}
            </div>
          )}

          {showHRList && (
            <>
              {HRdetails.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {HRdetails.map((hr) => (
                    <div
                      key={hr.id}
                      className="bg-gray-800 p-5 rounded-xl shadow-md border border-gray-700"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2">{hr.name}</h3>
                      <p className="text-gray-400 text-sm">📧 {hr.email}</p>
                      <p className="text-gray-400 text-sm">🧑‍💼 Role: {hr.role}</p>
                      {hr.createdAt && (
                        <p className="text-gray-500 text-xs mt-2">
                          Joined on {new Date(hr.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl text-center">
                  <p className="text-gray-300 mb-4">No HR personnel found in the system.</p>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                    onClick={handleNoHRRedirect}
                  >
                    Create HR Account
                  </Button>
                </div>
              )}
            </>
          )}

          {showOrgList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {getOrgDetails.map((org) => (
                <div
                  key={org.id}
                  className="bg-gray-800 p-5 rounded-xl shadow-md border border-gray-700"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-1">{org.name}</h3>
                  <p className="text-gray-300 text-sm mb-1">{org.description}</p>
                  <p className="text-gray-400 text-xs mb-1">📍 {org.location}</p>
                  <p className="text-gray-400 text-xs">🌐 <a href={org.website} target="_blank" className="underline">{org.website}</a></p>
                  <p className="text-gray-500 text-xs mt-2">
                    🏢 Industry: {org.industry} | 👥 Team: {org.teamSize}
                  </p>
                </div>
              ))}
            </div>
          )}

          {message && (
            <div className="w-full max-w-md mx-auto mt-4">
              <p className={`text-center p-4 rounded-lg ${
                message.includes("Redirecting") 
                  ? "bg-blue-500/20 text-blue-200"
                  : "bg-red-500/20 text-red-200"
              }`}>
                {message}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
