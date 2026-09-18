import { useState, useCallback, useRef } from "react";
import { api } from "../api/client"; // Use your unified API export
import { propertyService } from "../api/services";
import type { Property } from "../types/database";
import type { PropertySearchFilters } from "../components/property/PropertySearchBar";

export const usePropertySearch = () => {
  const [results, setResults]   = useState<Property[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (filters: PropertySearchFilters) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const apiFilters: Record<string, any> = {};

      if (filters.location.trim()) apiFilters.search = filters.location.trim();

      if (filters.minCashToStart !== "") apiFilters.min_cash_to_start = Number(filters.minCashToStart);
      if (filters.maxCashToStart !== "") apiFilters.max_cash_to_start = Number(filters.maxCashToStart);
      if (filters.minNetProfit !== "")   apiFilters.min_net_profit   = Number(filters.minNetProfit);
      if (filters.maxNetProfit !== "")   apiFilters.max_net_profit   = Number(filters.maxNetProfit);
      if (filters.leaseTerm)             apiFilters.lease_term       = filters.leaseTerm;
      if (filters.bedrooms !== "")       apiFilters.bedrooms         = Number(filters.bedrooms);
      if (filters.minRent !== "")        apiFilters.min_rent         = Number(filters.minRent);
      if (filters.maxRent !== "")        apiFilters.max_rent         = Number(filters.maxRent);
      if (filters.sort)                  apiFilters.sort             = filters.sort;

      const data = await propertyService.getProperties(apiFilters, {
        signal: abortRef.current.signal,
      });
      setResults(data);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setError("Search failed. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults([]);
    setSearched(false);
    setError(null);
  }, []);

  return { results, loading, error, searched, search, reset };
};
