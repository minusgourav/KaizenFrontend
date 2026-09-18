import React, { useState } from "react";
import { motion } from "motion/react";
import { Building2, CheckCircle2, Send, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface LandlordsViewProps {
  onBookCall?: () => void;
  triggerNotification?: (message: string, type?: "success" | "info" | "error") => void;
}

export const LandlordsView: React.FC<LandlordsViewProps> = ({
  onBookCall,
  triggerNotification,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("2");
  const [furnishing, setFurnishing] = useState("Furnished");
  const [expectedRent, setExpectedRent] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (triggerNotification) {
      triggerNotification("Property submission received! Our acquisitions team will contact you.", "success");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div
        className={`rounded-3xl border p-8 shadow-xl ${
          isDark
            ? "bg-[#161922] border-white/10 apple-specular"
            : "bg-white border-slate-200 shadow-slate-200/50"
        }`}
      >
        <span className="text-[10px] font-extrabold text-[#E04F33] bg-[#E04F33]/10 px-3 py-1 rounded-full uppercase tracking-widest border border-[#E04F33]/20 font-mono">
          Landlord Partner Portal
        </span>
        <h2
          className={`text-2xl sm:text-3xl font-extrabold mt-4 font-serif ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Have a Property Suitable for Short Term Rentals?
        </h2>
        <p
          className={`text-sm mt-2 leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          We source furnished and semi-furnished units in top vacation markets. Kaizen partners with landlords to handle listings, operations, pricing, and guest experience — giving you reliable long-term lease stability without operational hassle.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E04F33]/10 border border-[#E04F33]/20 text-[#E04F33] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Guaranteed On-Time Rent</p>
              <p className="text-[10px] text-slate-400 font-mono">Long-term lease agreements</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E04F33]/10 border border-[#E04F33]/20 text-[#E04F33] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Professional Maintenance</p>
              <p className="text-[10px] text-slate-400 font-mono">Cleanings &amp; 24/7 upkeep</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E04F33]/10 border border-[#E04F33]/20 text-[#E04F33] flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Vetted Sublease Terms</p>
              <p className="text-[10px] text-slate-400 font-mono">Zero tenant friction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Submission Form */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-xl ${
          isDark
            ? "bg-[#161922] border-white/10 apple-specular"
            : "bg-white border-slate-200 shadow-slate-200/50"
        }`}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className={`text-lg font-extrabold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                Submit Your Property Details
              </h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Fill out the quick form below and our acquisitions team will run a revenue analysis on your address.
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
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#E04F33] ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
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
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#E04F33] ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
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
                  placeholder="(555) 000-1234"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#E04F33] ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Property Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="123 Ocean Drive"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#E04F33] ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  City &amp; State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Pensacola, FL or Scottsdale, AZ"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#E04F33] ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#E04F33] cursor-pointer ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                >
                  <option value="1">1 Bedroom / Studio</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Furnishing Status
                </label>
                <select
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#E04F33] cursor-pointer ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                >
                  <option value="Furnished">Fully Furnished</option>
                  <option value="Partial">Partially Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Target Monthly Rent ($/mo)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3500"
                  value={expectedRent}
                  onChange={(e) => setExpectedRent(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#E04F33] ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                Additional Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention pool access, HOA regulations, available lease start date, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#E04F33] ${
                  isDark
                    ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#E04F33] hover:bg-[#C87D55] text-white font-bold rounded-2xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#E04F33]/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                Submit Property Form
              </button>

              {onBookCall && (
                <button
                  type="button"
                  onClick={onBookCall}
                  className={`px-8 py-3.5 rounded-2xl border text-xs font-bold font-mono transition-all cursor-pointer hover:scale-105 ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-slate-300 hover:bg-[#161922]"
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
            <h3 className="text-2xl font-extrabold font-serif">Property Submitted!</h3>
            <p className={`text-xs max-w-md mx-auto leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Thank you, <span className="font-bold text-[#E04F33]">{name}</span>. We have received your property details for{" "}
              <span className="font-bold">{address}, {city}</span>. Our team will analyze local STR rates and reach out shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-[#E04F33] hover:bg-[#C87D55] text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              Submit Another Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
