import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Phone, Mail, User, CheckCircle2, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerNotification?: (message: string, type?: "success" | "info" | "error") => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  triggerNotification,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Buyer");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (triggerNotification) {
      triggerNotification("Call request submitted! We will reach out within 24 hours.", "success");
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 relative overflow-hidden ${
            isDark
              ? "bg-[#161922] border-white/10 text-white apple-specular"
              : "bg-white border-stone-200 text-stone-900 shadow-stone-300/50"
          }`}
        >
          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E04F33]/10 border border-[#E04F33]/20 text-[#E04F33] dark:text-[#FF8A73] text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Consultation
                </div>
                <h2 className="text-2xl font-extrabold font-serif">Book a Call with Kaizen</h2>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Schedule an exclusive 1-on-1 walkthrough with our turnkey rental specialists.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#E04F33] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Soham Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#E04F33] ${
                        isDark
                          ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                          : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#E04F33] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#E04F33] ${
                          isDark
                            ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                            : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#E04F33] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="(312) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#E04F33] ${
                          isDark
                            ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                            : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                    I am interested as a:
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs font-mono font-medium focus:outline-none focus:border-[#E04F33] cursor-pointer ${
                      isDark
                        ? "bg-[#0F1117] border-white/10 text-white"
                        : "bg-stone-50 border-stone-200 text-stone-900"
                    }`}
                  >
                    <option value="Buyer">Turnkey Buyer / Host</option>
                    <option value="Landlord">Landlord / Property Owner</option>
                    <option value="Investor">Real Estate Investor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 text-slate-400">
                    Preferred Time / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g. Afternoon calls work best, interested in Pensacola deals."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:border-[#E04F33] ${
                      isDark
                        ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-600"
                        : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E04F33] hover:bg-[#C8432A] text-white font-bold rounded-2xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#E04F33]/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4" />
                  Confirm &amp; Book Call
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold font-serif">Call Scheduled!</h3>
              <p className={`text-xs max-w-sm mx-auto ${isDark ? "text-slate-300" : "text-stone-600"}`}>
                Thank you, <span className="font-bold text-[#E04F33]">{name}</span>. A Kaizen representative will call you at{" "}
                <span className="font-bold">{phone}</span> shortly.
              </p>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-[#E04F33] hover:bg-[#C8432A] text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
