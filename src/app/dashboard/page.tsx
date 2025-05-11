"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  const [step, setStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [HRdetails, setHRdetails] = useState<HRDetail[]>([]);
  const [showHRList, setShowHRList] = useState(false);
  const [getOrgDetails, setGetOrgDetails] = useState<OrgDetail[]>([]);
  const [showOrgList, setShowOrgList] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getHRdetails = async () => {
      try {
        const res = await axios.get("/api/admin/HRDetails");
        if (res.status === 201) {
          setHRdetails(res.data.getHrDetails);
        }
      } catch (err) {
        console.error("Failed to fetch HRs", err);
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

    getHRdetails();
    getOrgDetails();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-start p-6">
      <header className="w-full flex justify-between items-center py-6 px-10 bg-black/40 border-b border-gray-700">
        <div>
          <h1 className="text-3xl text-white tracking-wide">Admin Dashboard</h1>
          <p className="text-gray-400">Manage HR, and Create organizations</p>
        </div>
        <Button
          className="bg-white/10 text-white hover:bg-white/20 border border-transparent hover:border-white transition-all duration-500 py-2 px-4 rounded-xl tracking-wide"
          onClick={() => router.push("/HRsignup")}
        >
          Sign Up HR
        </Button>
      </header>

      <section className="w-full flex flex-col md:flex-row mt-10 gap-8">
        <div className="w-full md:w-1/4 flex flex-col gap-4">
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

        <div className="w-full md:w-3/4">
          {showForm && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
              {/* You can add your org creation form here */}
            </div>
          )}

          {showHRList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          )}

          {showOrgList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
        </div>
      </section>
    </main>
  );
}
