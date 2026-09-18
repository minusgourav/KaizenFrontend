import React, { useState } from "react";
import { motion } from "motion/react";
import { PropertyGrid } from "../property/PropertyGrid";
import { PropertySearchBar, PropertySearchFilters } from "../property/PropertySearchBar";
import type { Property } from "../../types/database";
import type { PropertyFilters } from "../../api/services";
import { useTheme } from "../../context/ThemeContext";

interface PropertiesViewProps {
  onOpenProspectus: (property: Property) => void;
  onRateDeal?: (property: Property) => void;
  triggerNotification?: (message: string, type?: "success" | "info" | "error") => void;
  initialFilters?: PropertyFilters;
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  onOpenProspectus,
  onRateDeal,
  initialFilters,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters || {});

  const handleSearch = (search: PropertySearchFilters) => {
    setFilters((prev) => ({
      ...prev,
      city: undefined,
      search: search.location ? search.location.trim() : undefined,
      min_cash_to_start: search.minCashToStart !== "" ? Number(search.minCashToStart) : undefined,
      max_cash_to_start: search.maxCashToStart !== "" ? Number(search.maxCashToStart) : undefined,
      min_net_profit: search.minNetProfit !== "" ? Number(search.minNetProfit) : undefined,
      max_net_profit: search.maxNetProfit !== "" ? Number(search.maxNetProfit) : undefined,
      lease_term: search.leaseTerm || undefined,
      bedrooms: search.bedrooms ? Number(search.bedrooms) : undefined,
      min_rent: search.minRent ? Number(search.minRent) : undefined,
      max_rent: search.maxRent ? Number(search.maxRent) : undefined,
      sort: search.sort || undefined,
    } as PropertyFilters));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between px-2"
      >
        <div>
          <h2
            className={`text-2xl font-bold font-heading ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Featured Turnkey Properties
          </h2>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-mono font-semibold">
            Curated luxury rentals with verified host bios and rating scores
          </p>
        </div>
      </motion.div>

      <PropertySearchBar onSearch={handleSearch} />

      <PropertyGrid
        filters={filters}
        onOpenProspectus={onOpenProspectus}
        onRateDeal={onRateDeal}
      />
    </div>
  );
};
