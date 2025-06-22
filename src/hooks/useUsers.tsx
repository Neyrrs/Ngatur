"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface userData{
  id: number,
  username: string,
  profile: string
}

export default function useUser() {
  const [user, setUser] = useState<userData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        
        setUser(res?.data?.user);
      } catch (err) {
        setError(err.message || "Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
