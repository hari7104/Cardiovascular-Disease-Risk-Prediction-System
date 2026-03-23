// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect.tsx";
import InputForm from "./components/InputForm.jsx";
import ResultCard from "./components/ResultCard.jsx";
import AuthContainer from "./pages/AuthContainer.jsx";
import useUser from "./hooks/useUser.jsx";

// ✅ Clean & correct Render-based API fallback logic
const API_BASE_URL = "http://localhost:10000"; // Update with your backend URL

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const submit = async (payload) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/predict`, payload, {
        timeout: 15000,
      });

      const enriched = { ...payload, ...res.data };
      setResult(enriched);
      localStorage.setItem("lastTestedPatient", JSON.stringify(enriched));

      setTimeout(() => {
        document.getElementById("result")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    } catch (e) {
      setError(e?.response?.data?.error || "Server not responding ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const { user, setUser } = useUser();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  const reset = () => setResult(null);

  return (
    <div className="relative min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-[#1C1C1C] dark:text-white overflow-x-hidden">
      <BackgroundRippleEffect />

      <Header user={user} setUser={setUser} />
      {user ? (
        <main className="relative z-10 flex-grow">
          <div className="max-w-4xl mx-auto px-4 pb-28 space-y-8">
            {error && (
              <div className="rounded-lg p-3 bg-danger/10 text-danger border border-danger/20">
                {String(error)}
              </div>
            )}

            {!result ? (
              <InputForm onSubmit={submit} isLoading={isLoading} />
            ) : (
              <div id="result">
                <ResultCard result={result} onReset={reset} />
              </div>
            )}
          </div>
        </main>
      ) : (
        <AuthContainer setUser={setUser} />
      )}

      <footer
        className="
  fixed bottom-0 left-0 w-full z-50 px-3
  backdrop-blur-md bg-white/50 dark:bg-black/30
  border-t border-white/20 dark:border-white/10
  text-[10px] sm:text-xs text-gray-700 dark:text-gray-400 py-2
"
      >
        <div className="flex justify-between items-center gap-1 max-w-4xl mx-auto">
          <span>© 2025 CV Risk</span>
          <span className="hidden sm:inline">• Built by Hari & Naijil </span>
        </div>
      </footer>
    </div>
  );
}
