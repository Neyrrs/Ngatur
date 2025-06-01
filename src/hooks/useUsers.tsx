"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user");
        setUsers(res?.data?.user);
      } catch (err) {
        setError(err.message || "Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
