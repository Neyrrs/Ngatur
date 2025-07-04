"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { IEvent, IEventSummaryResponse } from "@/types/eventType";

function useEvent<T>(endpoint: string) {
  const [event, setEvent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/track/event/${endpoint}`);
      setEvent(res?.data?.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event, loading, error, refetch: fetchEvent };
}

export const useEventSummary = () => useEvent<IEventSummaryResponse>("summary");
export const useGetEvent = () => useEvent<IEvent[]>("");
