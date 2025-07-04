"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import type { IEventSummaryResponse } from "@/types/eventType";

function useEvent<T>({ endpoint }: { endpoint: string }) {
  const [event, setEvent] = useState<T | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<T | null>(null);

  useEffect(() => {
    const fetchevent = async () => {
      try {
        const res = await axios.get(`/api/user/track/event/${endpoint}`);

        setEvent(res?.data?.data);
      } catch (err) {
        setError(err.message || "Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchevent();
  }, [endpoint]);

  return { event, loading, error };
}

export const useEventSummary = () => useEvent<IEventSummaryResponse>({ endpoint: "summary" });
