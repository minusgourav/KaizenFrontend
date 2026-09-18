import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
        isDark
          ? "bg-[#161922] text-[#E04F33] hover:text-[#C87D55] border border-white/10 shadow-lg shadow-black/40"
          : "bg-slate-100 text-[#E04F33] hover:text-[#C87D55] border border-slate-200 shadow-md shadow-[#E04F33]/10"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
        ) : (
          <Moon className="w-4 h-4 text-[#E04F33] fill-[#E04F33]/20" />
        )}
      </motion.div>
    </motion.button>
  );
};
