"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import type { IMoneySummaryResponse } from "@/types/moneyType";

function useMoney<T>({ endpoint }: { endpoint: string }) {
  const [money, setMoney] = useState<T | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<T | null>(null);

  useEffect(() => {
    const fetchMoney = async () => {
      try {
        const res = await axios.get(`/api/user/track/money/${endpoint}`);

        setMoney(res?.data?.data);
      } catch (err) {
        setError(err.message || "Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchMoney();
  }, [endpoint]);

  return { money, loading, error };
}

export const useSummary = () => useMoney<IMoneySummaryResponse>({ endpoint: "summary" });
