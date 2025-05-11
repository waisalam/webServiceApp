"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HrSignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const router= useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
    const res=  await axios.post("/api/admin/hrsignup", formData);
      if(res.status === 201){
        const data = res.data
        localStorage.setItem('token', data.token)
        setMessage("✅ HR account created successfully!");
        router.push('/HRdashboard')
      setFormData({ name: "", email: "", password: "" });
      }
    } catch (err: any) {
      setMessage(err.response?.data || "❌ Failed to create HR account.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Card className="w-full max-w-lg bg-black/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700">
        <CardHeader className="flex justify-between items-center bg-black/40 px-10 py-6 border-b border-gray-700">
          <div>
            <CardTitle className="text-3xl text-white tracking-wide">
              HR Signup
            </CardTitle>
            <CardDescription className="text-gray-400">
              Create your HR account to manage teams and hiring.
            </CardDescription>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-white p-2">
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="px-10 py-8 space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800 text-white"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="hr@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 text-white"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 text-white"
            />
          </div>

          <Button
            onClick={handleRegister}
            disabled={
              loading ||
              !formData.name ||
              !formData.email ||
              !formData.password
            }
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create HR Account"}
          </Button>

          {message && (
            <p
              className={`text-sm ${
                message.startsWith("✅")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-sm text-center text-gray-400">
            Already registered?{" "}
            <Link href="/signin" className="text-white underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
