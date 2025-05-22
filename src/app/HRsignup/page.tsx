"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

export default function HrSignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if user is NOT an Admin
    if (session?.user && session.user.role !== 'Admin') {
      router.push('/');
    }
  }, [session, router]);

  const [step, setStep] = useState<"email" | "verify" | "register">("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "HR", // Set default role to HR
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      console.log("Sending verification code to:", formData.email);
      const response = await axios.post("/api/users/sendcode", {
        email: formData.email,
      });
      console.log("API Response:", response.data);
      setStep("verify");
      setMessage("Verification code sent to your email.");
    } catch (err: any) {
      console.error("Error sending verification code:", err);
      setMessage(
        err.response?.data?.error || "Failed to send verification code."
      );
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("/api/users/verifyCode", {
        email: formData.email,
        code: formData.code,
      });
      setStep("register");
      setMessage("Email verified. Please complete your registration.");
    } catch (err: any) {
      setMessage(err.response?.data || "Verification failed.");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    try {
      if (!formData.name || !formData.password) {
        setMessage("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "HR"
      });

      if (response.status === 201) {
        setMessage("HR Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setMessage(err.response?.data?.message || "Failed to create account.");
    }
    setLoading(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Card className="w-full max-w-lg bg-black/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700">
        <CardHeader className="flex justify-between items-center bg-black/40 px-10 py-6 border-b border-gray-700">
          <div>
            <CardTitle className="text-3xl text-white tracking-wide">
              HR Registration
            </CardTitle>
            <CardDescription className="text-gray-400">
              {step === "email" && "Enter your email to get started."}
              {step === "verify" && "Enter the code sent to your email."}
              {step === "register" && "Complete your HR profile."}
            </CardDescription>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-white p-2">
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="px-10 py-8 space-y-6">
          {step === "email" && (
            <>
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
              <Button
                onClick={handleSendOtp}
                disabled={loading || !formData.email}
                className="w-full"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </Button>
            </>
          )}

          {step === "verify" && (
            <>
              <Label htmlFor="code" className="text-gray-300">
                Verification Code
              </Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="123456"
                value={formData.code}
                onChange={handleChange}
                className="bg-gray-800 text-white"
              />
              <Button
                onClick={handleVerifyCode}
                disabled={loading || !formData.code}
                className="w-full"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </>
          )}

          {step === "register" && (
            <>
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

              <Button
                onClick={handleRegister}
                disabled={loading || !formData.name || !formData.password}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? "Creating..." : "Create HR Account"}
              </Button>
            </>
          )}
        </CardContent>

        {message && (
          <p
            className={`px-10 pb-4 text-sm ${
              message.includes("failed") || message.includes("Invalid")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="px-10 pb-8 text-center text-sm text-gray-400">
          Already registered?{" "}
          <Link href="/signin" className="text-white underline">
            Sign In
          </Link>
        </div>
      </Card>
    </main>
  );
}
