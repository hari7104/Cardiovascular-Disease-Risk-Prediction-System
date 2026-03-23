import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const API_BASE_URL = "http://localhost:10000";

const Register = ({ switchToLogin }) => {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Auto-clear messages after 2.5 seconds
  useEffect(() => {
    if (error || result) {
      const timer = setTimeout(() => {
        setError(null);
        setResult(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error, result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/user/register`, {
        email,
        password,
      });

      const username =
        typeof res.data?.username === "string"
          ? res.data.username
          : res.data?.username?.name || email;

      setResult(`Account created successfully for ${username}`);
      localStorage.setItem("user", JSON.stringify({ username }));
      setUser({ username });

      setTimeout(() => {
        switchToLogin(
          `Account created for ${email}. Please login to continue.`,
        );
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error || "An error occurred during registration.",
        );
      } else {
        setError("An unexpected error occurred.");
        console.log("Error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="relative z-10 flex-grow flex flex-col min-h-screen pt-12">
      <div className="w-full max-w-md md:max-w-xl px-6 mx-auto">
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 shadow-xl rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Register
            </CardTitle>
            <CardDescription className="text-center">
              Create a new account to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-lg p-3 bg-danger/10 text-danger border border-danger/20">
                {String(error)}
              </div>
            )}
            {result && (
              <div className="rounded-lg p-3 bg-success/10 text-success border border-success/20">
                {String(result)}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 bg-white/70 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 bg-white/70 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2 flex flex-col relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-11 bg-white/70 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-amber-400"
                />{" "}
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-emerald-400 text-black hover:bg-emerald-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 font-semibold text-[16px] bg-emerald-400 text-black hover:bg-emerald-300 active:scale-95 transition"
              >
                {isLoading ? "Creating..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={switchToLogin}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
