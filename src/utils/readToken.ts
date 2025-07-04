import { cookies } from "next/headers";

export const readCookieToken = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  return token;
};
