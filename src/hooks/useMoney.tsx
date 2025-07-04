import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import type { IMoney, IMoneySummaryResponse } from "@/types/moneyType";

function useMoney<T>(endpoint: string) {
  const [money, setMoney] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoney = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/track/money${endpoint}`);
      setMoney(res.data?.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch");
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchMoney();
  }, [fetchMoney]);

  return { money, loading, error, refetch: fetchMoney };
}

export const useSummary = () => useMoney<IMoneySummaryResponse>("/summary");

export const useGetMoney = () => useMoney<IMoney[]>("");
