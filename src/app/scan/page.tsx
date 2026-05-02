"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Building, Tag, ArrowRight, Loader2 } from "lucide-react";

const SAMPLE_COMPANIES = [
  { name: "Stripe", category: "Fintech Payment Infrastructure" },
  { name: "Anthropic", category: "AI Foundational Models" },
  { name: "Vercel", category: "Frontend Deployment Platform" }
];

export default function ScanPage() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !category) return;
    
    setIsScanning(true);
    
    // Simulate API call to backend to initiate scan
    setTimeout(() => {
      // Navigate to dashboard
      router.push(`/dashboard?company=${encodeURIComponent(company)}&category=${encodeURIComponent(category)}`);
    }, 2000);
  };

  const selectSample = (sample: typeof SAMPLE_COMPANIES[0]) => {
    setCompany(sample.name);
    setCategory(sample.category);
  };

  return (
    <div className="container mx-auto px-6 max-w-4xl min-h-[70vh] flex flex-col justify-center relative">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Target Acquisition</h1>
        <p className="text-xl text-white/60">Enter the company you want to analyze or select a sample below.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative z-10"
      >
        <form onSubmit={handleScan} className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building className="text-white/40 group-focus-within:text-primary transition-colors" size={20} />
              </div>
              <input
                type="text"
                placeholder="Company Name (e.g., Acme Corp)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="text-white/40 group-focus-within:text-secondary transition-colors" size={20} />
              </div>
              <input
                type="text"
                placeholder="Industry / Category (e.g., Enterprise SaaS)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isScanning || !company || !category}
            className="w-full relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
            {isScanning && <div className="absolute inset-0 bg-black/40"></div>}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isScanning ? (
                <>
                  <Loader2 className="animate-spin text-white" size={20} />
                  Initiating Multi-Agent Scan...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Commence Autonomous Scan
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-sm text-white/40 font-medium mb-4 uppercase tracking-wider text-center">Quick Select Samples</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SAMPLE_COMPANIES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectSample(sample)}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-sm text-white/70 hover:text-white transition-all"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
