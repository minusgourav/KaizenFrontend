import React, { useState } from "react";
import {
  MapPin,
  Wallet,
  TrendingUp,
  Clock,
  Search,
  X,
  SlidersHorizontal,
  BedDouble,
  DollarSign,
  ArrowUpDown,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export interface PropertySearchFilters {
  location: string;
  minCashToStart: number | "";
  maxCashToStart: number | "";
  minNetProfit: number | "";
  maxNetProfit: number | "";
  cashRange: string;
  profitRange: string;
  leaseTerm: string;
  bedrooms: number | "";
  minRent: number | "";
  maxRent: number | "";
  sort: "newest" | "rent_low" | "rent_high" | "profit" | "cash_low" | "";
}

interface PropertySearchBarProps {
  onSearch: (filters: PropertySearchFilters) => void;
  initialFilters?: Partial<PropertySearchFilters>;
  loading?: boolean;
}

const EMPTY: PropertySearchFilters = {
  location: "",
  minCashToStart: "",
  maxCashToStart: "",
  minNetProfit: "",
  maxNetProfit: "",
  cashRange: "",
  profitRange: "",
  leaseTerm: "",
  bedrooms: "",
  minRent: "",
  maxRent: "",
  sort: "",
};

export const PropertySearchBar: React.FC<PropertySearchBarProps> = ({
  onSearch,
  initialFilters,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [filters, setFilters] = useState<PropertySearchFilters>({
    ...EMPTY,
    ...initialFilters,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasFilters = Object.entries(filters).some(
    ([, v]) => v !== "" && v !== null,
  );

  const handleTextOrSelectChange =
    (key: keyof PropertySearchFilters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

  const handleCashRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    let min: number | "" = "";
    let max: number | "" = "";

    if (val === "0-5000") {
      min = 0;
      max = 5000;
    } else if (val === "5000-10000") {
      min = 5000;
      max = 10000;
    } else if (val === "10000-25000") {
      min = 10000;
      max = 25000;
    } else if (val === "25000+") {
      min = 25000;
      max = "";
    }

    setFilters((prev) => ({
      ...prev,
      cashRange: val,
      minCashToStart: min,
      maxCashToStart: max,
    }));
  };

  const handleProfitRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    let min: number | "" = "";

    if (val === "500+") min = 500;
    else if (val === "1000+") min = 1000;
    else if (val === "1500+") min = 1500;
    else if (val === "2500+") min = 2500;
    else if (val === "5000+") min = 5000;

    setFilters((prev) => ({
      ...prev,
      profitRange: val,
      minNetProfit: min,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters(EMPTY);
    onSearch(EMPTY);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-slate-900/80 border-slate-800 shadow-slate-950/40"
          : "bg-white border-slate-200 shadow-slate-200/50"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row items-stretch gap-0 divide-y md:divide-y-0 md:divide-x ${
          isDark ? "divide-slate-800" : "divide-slate-100"
        }`}
      >
        {/* Market / City */}
        <label
          className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 transition-colors cursor-pointer ${
            isDark ? "focus-within:bg-slate-800/50" : "focus-within:bg-slate-50"
          }`}
        >
          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <div className="flex flex-col min-w-0 w-full">
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
              Market / City
            </span>
            <input
              type="text"
              value={filters.location}
              onChange={handleTextOrSelectChange("location")}
              placeholder="e.g. Austin, Miami, Dallas"
              className={`w-full bg-transparent text-xs font-medium focus:outline-none ${
                isDark ? "text-white placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
              }`}
            />
          </div>
        </label>

        {/* Cash to Start (range) */}
        <label
          className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 transition-colors cursor-pointer ${
            isDark ? "focus-within:bg-slate-800/50" : "focus-within:bg-slate-50"
          }`}
        >
          <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
              Cash to Start
            </span>
            <select
              value={filters.cashRange}
              onChange={handleCashRangeChange}
              className={`bg-transparent text-xs focus:outline-none font-mono cursor-pointer w-full ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <option value="" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                Any Cash Required
              </option>
              <option value="0-5000" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                Under $5,000
              </option>
              <option value="5000-10000" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $5,000 - $10,000
              </option>
              <option value="10000-25000" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $10,000 - $25,000
              </option>
              <option value="25000+" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $25,000+
              </option>
            </select>
          </div>
        </label>

        {/* Net Monthly Profit (range) */}
        <label
          className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 transition-colors cursor-pointer ${
            isDark ? "focus-within:bg-slate-800/50" : "focus-within:bg-slate-50"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
              Net Monthly Profit
            </span>
            <select
              value={filters.profitRange}
              onChange={handleProfitRangeChange}
              className={`bg-transparent text-xs focus:outline-none font-mono cursor-pointer w-full ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <option value="" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                Any Net Profit
              </option>
              <option value="500+" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $500+/mo
              </option>
              <option value="1000+" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $1,000+/mo
              </option>
              <option value="1500+" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $1,500+/mo
              </option>
              <option value="2500+" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $2,500+/mo
              </option>
              <option value="5000+" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                $5,000+/mo
              </option>
            </select>
          </div>
        </label>

        {/* Lease Term */}
        <label
          className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 transition-colors cursor-pointer ${
            isDark ? "focus-within:bg-slate-800/50" : "focus-within:bg-slate-50"
          }`}
        >
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
              Lease Term
            </span>
            <select
              value={filters.leaseTerm}
              onChange={handleTextOrSelectChange("leaseTerm")}
              className={`bg-transparent text-xs focus:outline-none font-mono cursor-pointer w-full ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <option value="" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                Any Lease Term
              </option>
              <option value="12 Months" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                12 Months
              </option>
              <option value="18 Months" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                18 Months
              </option>
              <option value="24 Months" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                24 Months
              </option>
              <option value="36 Months" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                36 Months
              </option>
              <option value="Flexible" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                Flexible / Sublease
              </option>
            </select>
          </div>
        </label>

        {/* Action Controls */}
        <div className="flex items-center gap-2 px-4 py-3.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowAdvanced((p) => !p)}
            className={`p-2.5 rounded-xl border transition-all ${
              showAdvanced
                ? "bg-blue-600/15 border-blue-500/40 text-blue-600 dark:text-blue-400"
                : isDark
                ? "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
            title="Advanced filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark
                  ? "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
              title="Clear filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-widest shadow-md shadow-blue-600/25 transition-all cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            Search
          </button>
        </div>
      </div>

      {/* Advanced Filters Drawer */}
      {showAdvanced && (
        <div
          className={`flex flex-wrap items-center gap-6 px-5 py-4 border-t transition-colors ${
            isDark
              ? "border-slate-800 bg-slate-950/40"
              : "border-slate-100 bg-slate-50/70"
          }`}
        >
          {/* Bedrooms */}
          <label className="flex items-center gap-2">
            <BedDouble className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
                Beds
              </span>
              <select
                value={filters.bedrooms}
                onChange={handleTextOrSelectChange("bedrooms")}
                className={`bg-transparent text-xs focus:outline-none font-mono cursor-pointer ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                <option value="" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                  Any Beds
                </option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option
                    key={n}
                    value={n}
                    className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}
                  >
                    {n}+ beds
                  </option>
                ))}
              </select>
            </div>
          </label>

          <div className={`w-px h-8 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

          {/* Min Rent */}
          <label className="flex items-center gap-2 min-w-[120px]">
            <DollarSign className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
                Min Rent
              </span>
              <input
                type="number"
                value={filters.minRent}
                onChange={handleTextOrSelectChange("minRent")}
                placeholder="0"
                min={0}
                className={`w-20 bg-transparent text-xs focus:outline-none font-mono ${
                  isDark ? "text-white placeholder:text-slate-600" : "text-slate-900 placeholder:text-slate-400"
                }`}
              />
            </div>
          </label>

          <div className={`w-px h-8 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

          {/* Max Rent */}
          <label className="flex items-center gap-2 min-w-[120px]">
            <DollarSign className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
                Max Rent
              </span>
              <input
                type="number"
                value={filters.maxRent}
                onChange={handleTextOrSelectChange("maxRent")}
                placeholder="No limit"
                min={0}
                className={`w-20 bg-transparent text-xs focus:outline-none font-mono ${
                  isDark ? "text-white placeholder:text-slate-600" : "text-slate-900 placeholder:text-slate-400"
                }`}
              />
            </div>
          </label>

          <div className={`w-px h-8 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

          {/* Sort By */}
          <label className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
                Sort by
              </span>
              <select
                value={filters.sort}
                onChange={handleTextOrSelectChange("sort")}
                className={`bg-transparent text-xs focus:outline-none font-mono cursor-pointer ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                <option value="" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                  Newest
                </option>
                <option value="rent_low" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                  Price: Low → High
                </option>
                <option value="rent_high" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                  Price: High → Low
                </option>
                <option value="profit" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                  Best Profit
                </option>
                <option value="cash_low" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                  Lowest Cash to Start
                </option>
              </select>
            </div>
          </label>

          {/* Active Filter Chips */}
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {filters.cashRange && (
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[10px] font-mono">
                Cash: {filters.cashRange}
              </span>
            )}
            {filters.profitRange && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                Profit: {filters.profitRange}
              </span>
            )}
            {filters.leaseTerm && (
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[10px] font-mono">
                Lease: {filters.leaseTerm}
              </span>
            )}
            {filters.bedrooms && (
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[10px] font-mono">
                {filters.bedrooms}+ beds
              </span>
            )}
          </div>
        </div>
      )}
    </form>
  );
};
