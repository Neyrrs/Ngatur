import jwt from "jsonwebtoken";

export function verifyToken(token?: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret || !token) return { valid: false, decoded: null };

  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, decoded: null };
  }
}
