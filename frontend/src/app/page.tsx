"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, BarChart3, Users, Network } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  { icon: Globe, title: "Autonomous Brand Research", desc: "Maps the entire digital footprint of any company across the web in seconds." },
  { icon: BarChart3, title: "Competitive Strategy", desc: "Builds real-time SWOT analysis and a dynamic threat matrix." },
  { icon: Users, title: "Decision-Maker Discovery", desc: "Identifies key executives and constructs organizational hierarchy graphs." },
  { icon: Network, title: "Precision Outreach", desc: "Drafts hyper-personalized communication tailored to each decision-maker's persona." },
  { icon: Shield, title: "Strategic Risk Assessment", desc: "Evaluates market vulnerabilities and regulatory threats." },
  { icon: Zap, title: "Real-Time Tracking", desc: "Continuous monitoring of brand activity and events footprint." },
];

const Counter = ({ end, label, prefix = "", suffix = "" }: { end: number, label: string, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-white/60 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">Engine v2.0 is now live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Autonomous <span className="text-gradient-primary">Intelligence</span>. <br className="hidden md:block" />
            Unfair Advantage.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/60 mb-10 max-w-2xl mx-auto"
          >
            Autonomous Brand Research. Competitive Strategy. Precision Outreach.
            The JC Market Intelligence Engine acts as your synthetic strategy team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/scan">
              <button className="relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Start Intelligence Scan
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <button className="px-8 py-4 rounded-xl font-bold text-white bg-surface border border-white/10 hover:bg-white/5 transition-colors">
              View Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Floating Dashboard Mockup */}
      <section className="relative px-6 -mt-12 md:-mt-20 z-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="container mx-auto max-w-5xl"
        >
          <div className="glass-panel rounded-2xl border border-white/10 shadow-2xl p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-surface/80 rounded-t-xl">
              <div className="w-3 h-3 rounded-full bg-danger"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-accent"></div>
            </div>
            <div className="bg-surface p-8 h-[400px] flex items-center justify-center relative overflow-hidden">
              {/* Fake UI Elements */}
              <div className="absolute inset-0 bg-mesh opacity-50"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">JC Market Intelligence Engine</h3>
                <div className="flex gap-4 justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={99} suffix="%" label="Accuracy Rate" />
            <Counter end={10} prefix="x" label="Faster Research" />
            <Counter end={4} label="Autonomous Agents" />
            <Counter end={500} prefix="+" label="Data Sources" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Engine Capabilities</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Enterprise-grade intelligence gathered autonomously in seconds.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-primary/20 blur-[100px]"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Ready for the Unfair Advantage?</h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">Deploy the JC Market Intelligence Engine today and stop guessing.</p>
          <Link href="/scan">
            <button className="px-10 py-5 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all animate-pulse-glow">
              Initialize Autonomous Scan
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
