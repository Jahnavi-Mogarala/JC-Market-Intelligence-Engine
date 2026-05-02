"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass-panel border-b border-white/10" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-white/10 overflow-hidden group-hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="font-heading font-bold text-lg text-gradient-primary z-10">JC</span>
          </div>
          <span className="font-heading font-semibold text-xl tracking-tight hidden sm:block">
            Market Intelligence Engine
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Platform</Link>
          <Link href="/scan" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Scan</Link>
          <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/scan">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 rounded-full font-medium text-sm overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
              <span className="relative z-10 flex items-center gap-2 text-white">
                <Activity size={16} className="text-primary group-hover:animate-pulse" />
                Initialize Scan
              </span>
              <div className="absolute inset-0 rounded-full neon-border opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
