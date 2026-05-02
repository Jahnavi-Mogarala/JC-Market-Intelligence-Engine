"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Loader2, Cpu, Globe, Users, MessageSquare } from "lucide-react";

const AGENTS = [
  { id: "research", name: "JC Research Agent", icon: Globe, description: "Mapping digital footprint and brand presence..." },
  { id: "competitor", name: "JC Competitor Agent", icon: Cpu, description: "Building SWOT and threat matrix..." },
  { id: "contact", name: "JC Contact Agent", icon: Users, description: "Identifying key decision-makers..." },
  { id: "outreach", name: "JC Outreach Agent", icon: MessageSquare, description: "Drafting hyper-personalized communication..." },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const company = searchParams.get("company") || "Target Company";
  const category = searchParams.get("category") || "General Industry";
  
  const [progress, setProgress] = useState(0);
  const [activeAgent, setActiveAgent] = useState(0);
  const [logs, setLogs] = useState<string[]>(["Initializing JC Market Intelligence Engine..."]);

  useEffect(() => {
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      // Update active agent based on progress
      if (currentProgress < 25) setActiveAgent(0);
      else if (currentProgress < 50) setActiveAgent(1);
      else if (currentProgress < 75) setActiveAgent(2);
      else if (currentProgress < 100) setActiveAgent(3);
      else {
        clearInterval(interval);
        setTimeout(() => {
          router.push(`/report?company=${encodeURIComponent(company)}&category=${encodeURIComponent(category)}`);
        }, 1000);
      }

      // Simulate logs
      if (currentProgress % 10 === 0 && currentProgress < 100) {
        setLogs(prev => [
          ...prev, 
          `[System] ${AGENTS[Math.floor(currentProgress / 25)]?.name} executing sequence ${currentProgress}...`
        ]);
      }
    }, 150); // Fast simulation for demo purposes

    return () => clearInterval(interval);
  }, [company, router]);

  return (
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Autonomous Scan: {company}</h1>
        <p className="text-white/60">Engine is actively acquiring and synthesizing intelligence.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Main Progress Bar */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-sm text-white/50 mb-1 uppercase tracking-wider font-medium">Overall Progress</div>
                <div className="text-2xl font-bold text-white">{progress}%</div>
              </div>
              {progress < 100 && (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm font-medium">Processing</span>
                </div>
              )}
            </div>
            <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 blur-[2px]"></div>
              </motion.div>
            </div>
          </div>

          {/* Agent Nodes */}
          <div className="grid sm:grid-cols-2 gap-4">
            {AGENTS.map((agent, idx) => {
              const status = idx < activeAgent ? "complete" : idx === activeAgent ? "active" : "pending";
              const Icon = agent.icon;
              
              return (
                <div 
                  key={agent.id} 
                  className={`p-5 rounded-xl border transition-all duration-300 ${
                    status === "active" 
                      ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]" 
                      : status === "complete"
                        ? "bg-surface/80 border-white/10 opacity-70"
                        : "bg-surface/30 border-white/5 opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${status === "active" ? "bg-primary/20 text-primary" : "bg-white/5 text-white/50"}`}>
                      <Icon size={20} />
                    </div>
                    {status === "complete" ? (
                      <CheckCircle2 className="text-accent" size={20} />
                    ) : status === "active" ? (
                      <Loader2 className="animate-spin text-primary" size={20} />
                    ) : (
                      <CircleDashed className="text-white/20" size={20} />
                    )}
                  </div>
                  <h3 className="font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{agent.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Status Feed */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col h-[500px]">
          <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            System Terminal
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs text-white/70 flex flex-col-reverse">
            {/* Using flex-col-reverse and reversing logs so newest is at bottom/top based on scroll logic */}
            <div className="space-y-2 mt-auto">
              {logs.map((log, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="pb-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-primary/70 mr-2">{">"}</span>
                  {log}
                </motion.div>
              ))}
              {progress < 100 && (
                <div className="animate-pulse flex items-center gap-2 pt-2">
                  <span className="w-1.5 h-3 bg-white/50 inline-block"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-6 max-w-5xl text-white text-center py-20"><Loader2 className="animate-spin inline mr-2" /> Loading Engine...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
