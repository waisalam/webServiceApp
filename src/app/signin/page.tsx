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
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
     if(formData.role === "ADMIN") {
      console.log("logging in as admin");
      
        const response = await axios.post("/api/admin/login", formData);
     if(response.status === 201) {
            setMessage(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", formData.role);
        router.push("/dashboard");
        }
      } else if (formData.role === "User") {
        console.log("logging in as user");
        const response = await axios.post("/api/users/login", formData);
        if (response.status === 201) {
          setMessage(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", formData.role);
        router.push("/user-dashboard");
      }} else if(formData.role === 'HR'){
        const res = await axios.post('/api/admin/hrlogin', formData)
        if(res.status === 201){
          const data = res.data
          setMessage(data.message)
          localStorage.setItem('token', data.token)
          localStorage.setItem('role', formData.role)
          router.push('/HRdashboard')
        }
      }
    } catch (err: any) {
      setMessage(err.response?.data || "Login failed. Please try again.");
    }
    setLoading(false);
  };


  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-black/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        <CardHeader className="flex justify-between items-center bg-black/40 px-10 py-6 border-b border-gray-700">
          <div>
            <CardTitle className="text-3xl text-white tracking-wide">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-400">
              Select your role and sign in
            </CardDescription>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-gray-200 p-2">
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
          </Link>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-8 px-10 py-8">
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <fieldset className="space-y-4">
              <legend className="text-gray-300 uppercase text-sm tracking-wider">
                I am logging in as
              </legend>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {["ADMIN", "HR", "User", "Developer"].map((r) => (
                  <label
                    key={r}
                    className="flex items-center space-x-3 bg-gray-800/60 p-4 rounded-lg border border-gray-700 hover:border-white transition"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={formData.role === r}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      required
                      className="h-4 w-4 text-white bg-gray-800 border-gray-600 focus:ring-white"
                    />
                    <span className="text-gray-200 font-medium">{r}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-gray-300 uppercase text-sm tracking-wider"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                required
                className="mt-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition"
              />
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-gray-300 uppercase text-sm tracking-wider"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                required
                className="mt-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition"
              />
            </div>
          </CardContent>

          <CardFooter className="px-0">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white/10 text-white hover:bg-white/20 border border-transparent hover:border-white transition-all duration-500 font-semibold py-3 rounded-xl tracking-wide"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>

        {message && (
          <p
            className={`px-10 pb-4 text-sm ${
              message.toLowerCase().includes("fail")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="px-10 pb-8 text-center text-sm text-gray-400">
          New here?{" "}
          <Link href="/signup" className="text-white underline hover:text-gray-200">
            Create an account
          </Link>
        </div>
      </Card>
    </main>
  );
}
