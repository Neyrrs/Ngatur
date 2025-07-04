"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { ITask, ITaskSummaryResponse } from "@/types/taskType";

function useTask<T>(endpoint: string) {
  const [task, setTask] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/track/task${endpoint}`);
      setTask(res?.data?.data);
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
    fetchTask();
  }, [fetchTask]);

  return { task, loading, error, refetch: fetchTask };
}

export const useTaskSummary = () => useTask<ITaskSummaryResponse>("/summary");
export const useGetTask = () => useTask<ITask[]>("");
