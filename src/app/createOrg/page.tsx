"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateOrganizationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    location: "",
    foundedYear: 2025,
    contactEmail: "",
    phoneNumber: "",
    teamSize: 1,
    socialLinks: "",
    figmaLink: "",
    domainName: "",
    needWebsite: false,
    goals: "",
    mission: "",
    specificFeatures: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter()

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type, checked } = e.target as HTMLInputElement;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox"
      ? checked
      : type === "number"
      ? Number(value)
      : value,
  }));
};


  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/admin/createOrg", formData);
    if(res.status === 201){
          setMessage("✅ Organization created successfully!");
          router.push('/dashboard')
      setFormData({
        name: "",
        description: "",
        industry: "",
        website: "",
        location: "",
        foundedYear:2025,
        contactEmail: "",
        phoneNumber: "",
        teamSize: 1,
        socialLinks: "",
        figmaLink: "",
        domainName: "",
        needWebsite: false,
        goals: "",
        mission: "",
        specificFeatures: "",
      });
    }
      setStep(1);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Failed to create organization.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl text-white font-semibold mb-6">Create Organization</h2>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Organization Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Acme Inc."
                className="bg-gray-800 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Description</Label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your organization"
                className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
              />
            </div>
            <div>
              <Label className="text-gray-300">Industry</Label>
              <Input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Tech, Healthcare..."
                className="bg-gray-800 text-white"
              />
            </div>
            <div>
  <Label className="text-gray-300">Location</Label>
  <Input
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder="New York, USA"
    className="bg-gray-800 text-white"
/>
</div>
<div>
  <Label className="text-gray-300">Founded Year</Label>
  <Input
    name="foundedYear"
    type="number"
    value={formData.foundedYear}
    onChange={handleChange}
    placeholder="2020"
    className="bg-gray-800 text-white"
/>
</div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4" onClick={() => setStep(2)}>
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Website</Label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="bg-gray-800 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Contact Email</Label>
              <Input
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="contact@example.com"
                className="bg-gray-800 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Phone Number</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+123456789"
                className="bg-gray-800 text-white"
              />
            </div>
            <div>
  <Label className="text-gray-300">Team Size</Label>
  <Input
    name="teamSize"
    type="number"
    value={formData.teamSize}
    onChange={handleChange}
    placeholder="50"
    className="bg-gray-800 text-white"
/>
</div>
<div>
  <Label className="text-gray-300">Social Links</Label>
  <Input
    name="socialLinks"
    value={formData.socialLinks}
    onChange={handleChange}
    placeholder="https://linkedin.com/company/your-org"
    className="bg-gray-800 text-white"
/>
</div>
<div>
  <Label className="text-gray-300">Figma Link</Label>
  <Input
    name="figmaLink"
    value={formData.figmaLink}
    onChange={handleChange}
    placeholder="https://www.figma.com/file/your-design"
    className="bg-gray-800 text-white"
/>
</div>

            <div className="flex justify-between mt-4">
              <Button className="bg-gray-700" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(3)}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Goals</Label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                placeholder="Company goals"
                className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
              />
            </div>
            <div>
              <Label className="text-gray-300">Mission</Label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                placeholder="Company mission"
                className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
              />
            </div>
            <div>
              <Label className="text-gray-300">Specific Features</Label>
              <textarea
                name="specificFeatures"
                value={formData.specificFeatures}
                onChange={handleChange}
                placeholder="Features you'd like in the platform"
                className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
              />
            </div>
            <div>
  <Label className="text-gray-300">Domain Name</Label>
  <Input
    name="domainName"
    value={formData.domainName}
    onChange={handleChange}
    placeholder="yourcompany.com"
    className="bg-gray-800 text-white"
/>
</div>
<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    name="needWebsite"
    checked={formData.needWebsite}
    onChange={handleChange}
    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
  />
  <Label className="text-gray-300">Need a website?</Label>
</div>

            <div className="flex justify-between mt-4">
              <Button className="bg-gray-700" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        )}

        {message && (
          <p className={`mt-6 text-sm ${message.includes("❌") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default CreateOrganizationPage;
