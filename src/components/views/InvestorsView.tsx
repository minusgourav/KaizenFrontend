import React, { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, CheckCircle2, Send, DollarSign, PieChart, ShieldCheck } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface InvestorsViewProps {
  onBookCall?: () => void;
  triggerNotification?: (message: string, type?: "success" | "info" | "error") => void;
}

export const InvestorsView: React.FC<InvestorsViewProps> = ({
  onBookCall,
  triggerNotification,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [capital, setCapital] = useState("$25k - $50k");
  const [targetMarket, setTargetMarket] = useState("Scottsdale, AZ");
  const [timeline, setTimeline] = useState("Immediate (Within 30 days)");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (triggerNotification) {
      triggerNotification("Investor inquiry submitted! You have been added to our private deal flow network.", "success");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div
        className={`rounded-3xl border p-8 shadow-xl ${
          isDark
            ? "bg-slate-900/70 border-slate-800 apple-specular"
            : "bg-white border-slate-200 shadow-slate-200/50"
        }`}
      >
        <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20 font-mono">
          Investor Network
        </span>
        <h2
          className={`text-2xl sm:text-3xl font-extrabold mt-4 font-serif ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Access Vetted Turnkey Short Term Rental Deals
        </h2>
        <p
          className={`text-sm mt-2 leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Get priority access to off-market, landlord-vetted turnkey properties with transparent startup costs, verified occupancy metrics, and exclusive 15-minute hold guarantees.
        </p>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Audited Financial Projections</p>
              <p className="text-[10px] text-slate-400 font-mono">Real Airbtics &amp; rate data</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Turnkey Operations</p>
              <p className="text-[10px] text-slate-400 font-mono">Pre-built listings &amp; photos</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Zero Guesswork</p>
              <p className="text-[10px] text-slate-400 font-mono">No promises we can't back up</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investor Interest Form */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-xl ${
          isDark
            ? "bg-slate-900/70 border-slate-800 apple-specular"
            : "bg-white border-slate-200 shadow-slate-200/50"
        }`}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className={`text-lg font-extrabold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                Join Kaizen Private Deal Flow
              </h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Share your target parameters to receive verified deal prospectuses before public release.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Marcus Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="marcus@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(312) 555-0188"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Available Capital
                </label>
                <select
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                >
                  <option value="$10k - $25k">$10k - $25k</option>
                  <option value="$25k - $50k">$25k - $50k</option>
                  <option value="$50k - $100k">$50k - $100k</option>
                  <option value="$100k+">$100k+</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Target Market
                </label>
                <select
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                >
                  <option value="Scottsdale, AZ">Scottsdale, AZ</option>
                  <option value="Pensacola, FL">Pensacola, FL</option>
                  <option value="Blue Ridge, GA">Blue Ridge, GA</option>
                  <option value="Any High Yield Market">Any High Yield Market</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Target Acquisition Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                >
                  <option value="Immediate (Within 30 days)">Immediate (Within 30 days)</option>
                  <option value="1 - 3 Months">1 - 3 Months</option>
                  <option value="Exploring & Learning">Exploring &amp; Learning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                Investment Goals &amp; Preferences
              </label>
              <textarea
                rows={3}
                placeholder="E.g. Seeking high ADR luxury villas with pool amenities in Florida or Arizona."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                Join Deal Flow Network
              </button>

              {onBookCall && (
                <button
                  type="button"
                  onClick={onBookCall}
                  className={`px-8 py-3.5 rounded-2xl border text-xs font-bold font-mono transition-all cursor-pointer hover:scale-105 ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Book a Call
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold font-serif">Investor Registration Complete!</h3>
            <p className={`text-xs max-w-md mx-auto leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Welcome, <span className="font-bold text-blue-500">{name}</span>. You are now subscribed to Kaizen's private deal flow for <span className="font-bold">{targetMarket}</span>. We will alert you as soon as matching turnkey inventory is live.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              Update Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
