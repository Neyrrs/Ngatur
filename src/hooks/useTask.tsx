"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface ITaskResponse {
  id: number;
  name: string;
  status: string;
  date: string;
  description: string;
}

export default function useTask() {
  const [task, seTask] = useState<ITaskResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `/api/user/track/task?startDate="2025-07-01"&endDate="2025-07-31"`
        );

        seTask(res?.data?.data);
      } catch (err) {
        setError(err.message || "Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  return { task, loading, error };
}
