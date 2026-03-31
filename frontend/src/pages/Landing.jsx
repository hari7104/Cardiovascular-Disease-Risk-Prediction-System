import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar.jsx";
import useUser from "../hooks/useUser.jsx";
import { ArrowRight, ShieldCheck, Heart, Activity } from "lucide-react";

export default function Landing() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (user) navigate("/predict");
    else navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-emerald-500/30 font-sans">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-emerald-500/20 dark:bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/20 dark:bg-amber-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI-Powered Accuracy
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Predict Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">Heart Health</span> <br className="hidden md:block"/> with Confidence
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Advanced machine learning meets intuitive design. Enter your clinical parameters and get instantaneous insights into your cardiovascular risk profile.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTA}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-lg shadow-xl shadow-gray-900/20 dark:shadow-white/10 hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:-translate-y-1 transition-all"
            >
              {user ? "Go to Dashboard" : "Start your Prediction"}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats / Features short section */}
      <section className="py-12 border-y border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 relative z-10 pt-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Your health data is not stored permanently. We prioritize your privacy above all.</p>
            </motion.div>
            <motion.div 
              initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Our streamlined UI ensures you get your risk assessment in seconds without friction.</p>
            </motion.div>
            <motion.div 
              initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center p-6"
            >
             <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">14 Key Parameters</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Analyzes essential markers including cholesterol, ECG, and max heart rate.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        {/* Soft Background */}
        <div className="absolute inset-0 bg-emerald-50/50 dark:bg-emerald-900/5 -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div 
            initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">About the Project</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full mb-8" />
            <div className="p-8 rounded-3xl bg-white/70 dark:bg-neutral-900/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none text-left">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Cardiovascular diseases (CVDs) are the leading cause of death globally. Early detection 
                and management can significantly improve outcomes. This project was developed by 
                <span className="font-semibold text-emerald-600 dark:text-emerald-400"> Hari & Naijil </span>  
                to provide a reliable, fast, and accessible tool for predicting potential heart disease risks based on 
                well-established clinical data points. 
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                By bridging the gap between healthcare data and modern web technologies, we aim to deliver a 
                premium user experience while offering invaluable foresight into one's cardiac well-being. Built with 
                cutting edge AI running as the core processing engine to bring peace of mind.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/80 py-8 text-center text-gray-500 dark:text-gray-400 text-sm mt-auto relative z-10">
        <p>© 2025 Cardiovascular Disease Risk Prediction System. Built by Hari & Naijil.</p>
      </footer>
    </div>
  );
}
