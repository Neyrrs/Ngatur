"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("/api/user");

        if (res.status !== 200) {
          router.replace("/login");
        }
      } catch {
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    };
    verify();
  }, [router]);

  if (checking) return null;

  return <>{children}</>;
};

export default AuthGuard;
