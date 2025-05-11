"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HRDetail = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string; // optional
};

export default function Dashboard() {
  const [step, setStep] = useState(1); // Track the current step
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [HRdetails, setHRdetails] = useState<HRDetail[]>([]);
const [showHRList, setShowHRList] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    location: "",
    foundedYear: "",
    contactEmail: "",
    phoneNumber: "",
    teamSize: "",
    socialLinks: "",
    figmaLink: "",
    domainName: "",
    needWebsite: false,
    goals: "",
    mission: "",
    specificFeatures: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

useEffect(() => {
  const getHRdetails = async () => {
    try {
      const res = await axios.get("/api/admin/HRDetails");
      if (res.status === 201) {
        console.log(res.data);
        
        setHRdetails(res.data.getHrDetails
);
      }
    } catch (err) {
      console.error("Failed to fetch HRs", err);
    }
  };

  getHRdetails();
}, []); 


  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/organization/create", formData);
      setMessage("✅ Organization created successfully!");
      setFormData({
        name: "",
        description: "",
        industry: "",
        website: "",
        location: "",
        foundedYear: "",
        contactEmail: "",
        phoneNumber: "",
        teamSize: "",
        socialLinks: "",
        figmaLink: "",
        domainName: "",
        needWebsite: false,
        goals: "",
        mission: "",
        specificFeatures: "",
      });
      setStep(1); // Reset to the first step
      setShowForm(false); // Hide the form after submission
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to create organization.");
    }
  };

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
  {/* Left Sidebar for Buttons */}
  <div className="w-full md:w-1/4 flex flex-col gap-4">
    <Button
      className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 py-3 px-6 rounded-lg"
      onClick={() => {
      router.push('/createOrg')
      }}
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
  </div>

  {/* Right Content Area */}
  <div className="w-full md:w-3/4">
    {/* Organization Form */}
    {showForm && (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
       
      </div>
    )}

    {/* HR Details List */}
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
  </div>
</section>




    </main>
  );
}


