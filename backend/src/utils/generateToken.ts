import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET!;
  if (!secret) throw new Error("JWT_SECRET not defined");
  return jwt.sign({ id: userId, role }, secret, { expiresIn: '1d' });
};
