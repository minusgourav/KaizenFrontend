import React, { useState, useEffect } from "react";
import {
  Clock,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { BookingRecord, bookingService as lockApi } from "../../api/services";
import { useTheme } from "../../context/ThemeContext";

interface BookingLockFlowProps {
  booking: BookingRecord;
  onClose: () => void;
  onStateChange?: (updated: BookingRecord) => void;
}

export const BookingLockFlow: React.FC<BookingLockFlowProps> = ({
  booking: initialBooking,
  onClose,
  onStateChange,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [booking, setBooking] = useState<BookingRecord>(initialBooking);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expired, setExpired] = useState(false);
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Poll status while locked or pending_review
  useEffect(() => {
    if (booking.state !== "locked" && booking.state !== "pending_review")
      return;
    const interval = setInterval(async () => {
      try {
        const latest = await lockApi.getBooking(booking.id);
        setBooking(latest);
        onStateChange?.(latest);
      } catch (err) {
        console.error("Failed to poll booking status", err);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [booking.id, booking.state, onStateChange]);

  // Countdown timer for locked state
  useEffect(() => {
    if (booking.state !== "locked" || !booking.expires_at) return;
    const updateTimer = () => {
      const diff = new Date(booking.expires_at!).getTime() - Date.now();
      if (diff <= 0) {
        setMinutes(0);
        setSeconds(0);
        setExpired(true);
      } else {
        setMinutes(Math.floor(diff / 60000));
        setSeconds(Math.floor((diff % 60000) / 1000));
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [booking.state, booking.expires_at]);

  const handleSubmitReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) {
      setSubmitError("Please enter your payment reference ID.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const updated = await lockApi.submitPaymentReference(
        booking.id,
        reference.trim(),
      );
      setBooking(updated);
      onStateChange?.(updated);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit reference.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    try {
      const updated = await lockApi.cancelBooking(booking.id);
      setBooking(updated);
      onStateChange?.(updated);
    } catch (err) {
      console.error("Failed to cancel lock", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md font-sans">
      <div
        className={`relative w-full max-w-md border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 transition-all duration-300 ${
          isDark
            ? "bg-[#161922] border-white/10 text-stone-100 shadow-black/60"
            : "bg-white/95 border-stone-200 text-stone-900 shadow-stone-300/40"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E04F33]/15 border border-[#E04F33]/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#E04F33] dark:text-[#FF8A73]" />
          </div>
          <div>
            <h3
              className={`text-lg font-bold font-heading ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Complete your lock
            </h3>
            <p className="text-[11px] text-[#E04F33] dark:text-[#FF8A73] font-mono font-semibold">
              Booking #{booking.id}
            </p>
          </div>
        </div>

        {/* LOCKED: countdown + payment link + reference form */}
        {booking.state === "locked" && !expired && (
          <div className="space-y-5">
            <div
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl border ${
                isDark
                  ? "bg-[#0F1117] border-white/10"
                  : "bg-orange-50/70 border-orange-100"
              }`}
            >
              <Clock className="w-4 h-4 text-[#E04F33] dark:text-[#FF8A73] animate-pulse" />
              <span
                className={`text-2xl font-mono font-bold tabular-nums ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
              <span className="text-xs text-slate-500 font-mono ml-1">remaining</span>
            </div>

            <a
              href={booking.payment_link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#E04F33] hover:bg-[#C8432A] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#E04F33]/25"
            >
              Pay with PayPal
              <ExternalLink className="w-4 h-4" />
            </a>

            <div
              className={`pt-3 border-t ${
                isDark ? "border-white/10" : "border-stone-100"
              }`}
            >
              <p className="text-[11px] text-slate-500 mb-2.5 leading-relaxed">
                After paying, paste the PayPal transaction ID / reference from your receipt
                below so our team can confirm it.
              </p>
              <form onSubmit={handleSubmitReference} className="space-y-3">
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. 8AB123456C789012D"
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs font-mono focus:outline-none focus:border-[#E04F33] ${
                    isDark
                      ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-500"
                      : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                  }`}
                />
                {submitError && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-[#E04F33] hover:bg-[#C8432A] disabled:opacity-60 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#E04F33]/20"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Submitting..." : "I've paid — submit for review"}
                </button>
              </form>
            </div>

            <button
              onClick={handleCancel}
              className="w-full text-center text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
            >
              Cancel this lock
            </button>
          </div>
        )}

        {/* PENDING REVIEW */}
        {booking.state === "pending_review" && (
          <div className="space-y-4 text-center py-4">
            <Loader2 className="w-8 h-8 text-[#E04F33] dark:text-[#FF8A73] animate-spin mx-auto" />
            <div>
              <p
                className={`text-sm font-bold ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                Awaiting confirmation
              </p>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                We're verifying your payment (ref:{" "}
                <span className="font-mono text-[#E04F33] dark:text-[#FF8A73] font-semibold">
                  {booking.payment_reference}
                </span>
                ). This usually takes a few minutes — this page will update automatically.
              </p>
            </div>
          </div>
        )}

        {/* PURCHASED */}
        {booking.state === "purchased" && (
          <div className="space-y-3 text-center py-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <div>
              <p
                className={`text-sm font-bold ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                Payment confirmed!
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {booking.property_title} is now yours. We'll follow up with next steps.
              </p>
            </div>
            <button
              onClick={onClose}
              className={`mt-2 px-5 py-2 border rounded-xl text-xs font-bold transition-all ${
                isDark
                  ? "bg-[#0F1117] hover:bg-stone-800 border-white/10 text-slate-200"
                  : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-800"
              }`}
            >
              Close
            </button>
          </div>
        )}

        {/* EXPIRED / CANCELLED */}
        {(booking.state === "expired" || booking.state === "cancelled" || expired) &&
          booking.state !== "purchased" && (
            <div className="space-y-3 text-center py-4">
              <XCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <div>
                <p
                  className={`text-sm font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {booking.state === "cancelled" ? "Lock cancelled" : "Lock expired"}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  This property is available again — you're welcome to lock it once more.
                </p>
              </div>
              <button
                onClick={onClose}
                className={`mt-2 px-5 py-2 border rounded-xl text-xs font-bold transition-all ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                }`}
              >
                Close
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
