"use client";

import { useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, FileText, CheckCircle2, TrendingUp, AlertTriangle, 
  ShieldAlert, Mail, Send, Copy, RefreshCw, Briefcase, Loader2
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

const generateDynamicData = (company: string, category: string) => {
  const hash = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const score = 85 + (hash % 12);
  const threatLevels = ["CRITICAL", "ELEVATED", "MODERATE", "WATCH"];
  const threatIndex = threatLevels[hash % threatLevels.length];

  const swot = {
    S: [
      `Proprietary ${category} architecture`,
      `Rapid adoption in ${hash % 2 === 0 ? 'Enterprise' : 'SMB'} segments`,
      `Unique positioning as a ${company}-centric ecosystem`
    ],
    W: [
      `Scaling challenges in ${hash % 3 === 0 ? 'APAC' : 'EMEA'} markets`,
      `Heavy R&D spend on ${category} optimization`,
      `Complex onboarding for non-technical users`
    ],
    O: [
      `Expansion into autonomous ${category} workflows`,
      `Integration with emerging LLM frameworks`,
      `Partnership potential with global ${hash % 2 === 0 ? 'cloud' : 'fintech'} providers`
    ],
    T: [
      `Disruption from open-source ${category} alternatives`,
      `Tightening data privacy regulations in the EU`,
      `Aggressive talent poaching from tech giants`
    ]
  };

  const competitors = [
    { name: `${company} OpenSource`, threat: 40 + (hash % 30), marketShare: 10 + (hash % 10) },
    { name: `Global ${category.split(' ')[0]}`, threat: 60 + (hash % 25), marketShare: 20 + (hash % 15) },
    { name: "Legacy Player Inc.", threat: 30 + (hash % 40), marketShare: 30 + (hash % 20) },
    { name: `Neo ${company}`, threat: 70 + (hash % 20), marketShare: 5 + (hash % 10) },
  ];

  const contacts = [
    { name: `${String.fromCharCode(65 + (hash % 26))}lex Thompson`, role: `Head of ${category.split(' ')[0]}`, type: "Decision Maker" },
    { name: `Jordan ${String.fromCharCode(65 + ((hash + 5) % 26))}mith`, role: "Chief Strategy Officer", type: "Influencer" },
    { name: `Taylor Reed`, role: "VP Operations", type: "Economic Buyer" },
  ];

  return { score, threatIndex, swot, competitors, contacts };
};

const DRAFTS = {
  Consultative: "Hi {name},\n\nI noticed {company} has been rapidly expanding its capabilities in {category}. Given your role as {role}, I thought you might be interested in how we've helped similar infrastructure providers reduce operational overhead by 40% using JC Intelligence systems.\n\nOpen to a brief chat next Tuesday?",
  Aggressive: "Hi {name},\n\n{company}'s current market positioning in {category} is leaving revenue on the table. As {role}, you know that the threat from emerging competitors is reaching critical levels.\n\nWe have a direct strategy to reclaim your dominance. Let's talk this week.",
  Value: "Hi {name},\n\nI put together a custom threat matrix for {company} analyzing your positioning in the {category} space. As {role}, I think you'll find these unique strategic insights highly relevant to your Q3 goals.\n\nMind if I send the PDF over?"
};

function ReportContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company") || "Target Company";
  const category = searchParams.get("category") || "General Industry";
  
  const reportData = useMemo(() => generateDynamicData(company, category), [company, category]);
  
  const [activeContact, setActiveContact] = useState(reportData.contacts[0]);
  const [tone, setTone] = useState<keyof typeof DRAFTS>("Consultative");
  const [copied, setCopied] = useState(false);

  const getDraft = () => {
    return DRAFTS[tone]
      .replace("{name}", activeContact.name.split(" ")[0])
      .replace("{company}", company)
      .replace("{category}", category)
      .replace("{role}", activeContact.role);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getDraft());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4 border border-accent/20">
            <CheckCircle2 size={14} /> Scan Complete
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{company}</h1>
          <p className="text-xl text-white/60">{category} | Executive Intelligence Report</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-surface border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm font-medium">
            <FileText size={16} /> CRM Sync
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 border border-primary/50 transition-colors flex items-center gap-2 text-sm font-bold">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Key Metrics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
            <h3 className="text-sm text-white/50 uppercase tracking-wider font-bold mb-2">JC Intelligence Score</h3>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-heading font-bold text-gradient-primary">{reportData.score}</span>
              <span className="text-xl text-white/40 mb-1">/100</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-accent">
              <TrendingUp size={16} /> Top 5% of industry
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-danger/20 rounded-full blur-2xl group-hover:bg-danger/30 transition-colors"></div>
            <h3 className="text-sm text-white/50 uppercase tracking-wider font-bold mb-2">Market Threat Index</h3>
            <div className="flex items-center gap-3">
              <ShieldAlert size={40} className="text-danger" />
              <span className="text-4xl font-heading font-bold text-danger">{reportData.threatIndex}</span>
            </div>
            <div className="mt-4 text-sm text-white/60">
              High risk of disruption in next 12 months.
            </div>
          </div>
        </div>

        {/* SWOT Analysis */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="font-heading font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Briefcase size={20} className="text-primary" /> Strategic SWOT Analysis
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface border border-accent/20">
                <h4 className="font-bold text-accent mb-2 flex items-center gap-2">Strengths</h4>
                <ul className="space-y-2">
                  {reportData.swot.S.map((item, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-primary/20">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">Opportunities</h4>
                <ul className="space-y-2">
                  {reportData.swot.O.map((item, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface border border-amber-500/20">
                <h4 className="font-bold text-amber-500 mb-2 flex items-center gap-2">Weaknesses</h4>
                <ul className="space-y-2">
                  {reportData.swot.W.map((item, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-danger/20">
                <h4 className="font-bold text-danger mb-2 flex items-center gap-2">Threats</h4>
                <ul className="space-y-2">
                  {reportData.swot.T.map((item, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-danger mt-1.5 shrink-0"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Competitor Matrix */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="font-heading font-bold text-xl text-white mb-6 flex items-center gap-2">
            <AlertTriangle size={20} className="text-secondary" /> Competitor Threat Matrix
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData.competitors} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#ffffff40" />
                <YAxis dataKey="name" type="category" stroke="#ffffff80" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#12121A', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#00F0FF' }}
                />
                <Bar dataKey="threat" radius={[0, 4, 4, 0]}>
                  {reportData.competitors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.threat > 75 ? '#FF0055' : entry.threat > 65 ? '#9D00FF' : '#00F0FF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Outreach Console */}
        <div className="glass-panel p-0 rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-surface/50 flex justify-between items-center">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Mail size={20} className="text-primary" /> Outreach Console
            </h3>
            <div className="flex bg-surface rounded-lg p-1 border border-white/10">
              {(Object.keys(DRAFTS) as Array<keyof typeof DRAFTS>).map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${tone === t ? 'bg-primary/20 text-primary' : 'text-white/50 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-1">
            {/* Contacts Sidebar */}
            <div className="w-1/3 border-r border-white/5 bg-surface/30 p-4 space-y-2 overflow-y-auto">
              <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-3 px-2">Decision Makers</div>
              {reportData.contacts.map((contact, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveContact(contact)}
                  className={`w-full text-left p-3 rounded-xl transition-colors ${activeContact.name === contact.name ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <div className="font-bold text-sm text-white">{contact.name}</div>
                  <div className="text-xs text-white/50 truncate">{contact.role}</div>
                </button>
              ))}
            </div>
            
            {/* Draft Area */}
            <div className="w-2/3 p-6 flex flex-col relative">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium text-white/70">
                  To: <span className="text-white">{activeContact.name}</span>
                </div>
                <button className="text-primary/70 hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium">
                  <RefreshCw size={12} /> Regenerate
                </button>
              </div>
              
              <div className="flex-1 bg-surface border border-white/10 rounded-xl p-4 font-sans text-sm text-white/80 whitespace-pre-wrap leading-relaxed relative group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tone + activeContact.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getDraft()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={handleCopy}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  {copied ? <CheckCircle2 size={16} className="text-accent" /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-black hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Send size={16} /> Send via Apollo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-6 max-w-7xl text-white text-center py-20"><Loader2 className="animate-spin inline mr-2" /> Generating Report...</div>}>
      <ReportContent />
    </Suspense>
  );
}
