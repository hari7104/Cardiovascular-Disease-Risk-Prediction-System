import axios from "axios";
import { useState, useEffect } from "react";
const API_BASE_URL = "http://localhost:10000";
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

const Login = ({ setUser, switchToRegister, msg }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });

      const username =
        typeof res.data?.username === "string"
          ? res.data.username
          : res.data?.username?.name || "User";

      setResult(`Welcome back, ${username}!`);
      localStorage.setItem("user", JSON.stringify({ username }));
      setUser({ username });
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred during login.",
      );
      console.log("Error details:", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect for auto-clearing messages
  useEffect(() => {
    if (error || result) {
      const timer = setTimeout(() => {
        setError(null);
        setResult(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error, result]);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <main className="relative z-10 flex-grow flex  justify-center ">
        <div className="w-full max-w-lg md:max-w-xl px-6 py-12">
          {/* <Card className="backdrop-blur-sm bg-white/70 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700"> */}
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 shadow-xl rounded-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-center">
                Login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error ? (
                <div className="rounded-lg p-3 bg-danger/10 text-danger border border-danger/20">
                  {String(error)}
                </div>
              ) : (
                ""
              )}

              {result ? (
                <div className="rounded-lg p-3 bg-success/10 text-success border border-success/20">
                  {String(result) || String(msg)}
                </div>
              ) : (
                ""
              )}

              {msg &&
                !Object.prototype.toString.call(msg) === "[object String]" && (
                  <div className="rounded-lg p-3 bg-success/10 text-success border border-success/20">
                    {String(msg)}
                  </div>
                )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className=" h-11 bg-white/70 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-2 flex flex-col relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className=" h-11 bg-white/70 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-amber-400"
                  />
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
                  disabled={false}
                  className="w-full h-11 font-semibold text-[16px] bg-emerald-400 text-black hover:bg-emerald-300 active:scale-95 transition"
                >
                  {isLoading ? "logging..." : "Login"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  onClick={switchToRegister}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
                >
                  Create account
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Login;
