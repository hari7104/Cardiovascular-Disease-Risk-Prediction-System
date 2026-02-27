import axios from "axios";
import { useState } from "react";
const API_BASE_URL = "http://localhost:10000";
const Login = ({ setUser, switchToRegister }) => {
  function Field({ label, name, children, hint }) {
    return (
      <div className="space-y-1 w-full p-5">
        <label className="flex items-center gap-2 text-sm text-neutral-800 dark:text-neutral-100">
          <span>{label}</span>
          {hint && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              ({hint})
            </span>
          )}
        </label>
        {children}
      </div>
    );
  }
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
      setResult(`welcome back, ${res.data?.username}!` || "welcome back, user");
      const userData = res.data?.username || "Unknown User";
      localStorage.setItem("user", JSON.stringify({ username: userData }));
      setUser({ username: userData });
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred during login.",
      );
      console.log("Error details:", error.response);
    } finally {
      setIsLoading(false);
      setTimeout(() => setError(null), 3000);
      setTimeout(() => setResult(null), 3000);
    }
  };

  return (
    <>
      <main className="relative z-10 flex-grow">
        <div className="max-w-4xl mx-auto px-4 pb-28 space-y-8">
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
          <form
            onSubmit={handleSubmit}
            className="w-full items-center justify-center flex flex-col flex-wrap"
          >
            <Field label="Email" hint="Enter your email address">
              <input
                type="email"
                name="email"
                className="w-full bg-white/70 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all backdrop-blur-sm"
                placeholder="Enter your email address"
              />
            </Field>
            <Field label="Password" hint="Enter your password">
              <input
                type="password"
                name="password"
                className="w-full bg-white/70 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all backdrop-blur-sm"
                placeholder="Enter your password"
              />
            </Field>
            <button
              type="submit"
              disabled={false}
              className="px-4 py-2 rounded-lg bg-emerald-400 text-black hover:bg-emerald-300 disabled:opacity-50 active:scale-95 transition shadow"
            >
              {isLoading ? "logging..." : "Login"}
            </button>
          </form>
          <button onClick={switchToRegister}>Create account</button>
        </div>
      </main>
    </>
  );
};

export default Login;
