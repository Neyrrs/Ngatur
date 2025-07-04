"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IUser } from "@/types/userType";

export function useUser<T>(endpoint: string) {
  const [user, setUser] = useState<T | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user${endpoint}`);
      setUser(res?.data?.user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Gagal mengambil data user");
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
}

export const useGetUser = () => useUser<IUser>("")
