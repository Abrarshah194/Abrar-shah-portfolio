import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'abrar-shah-exporton-networks-jwt-secure-secret-2026';

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Check authorization header or cookie
  const authHeader = req.headers.authorization;
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Authentication token is required.',
      errors: ['No token provided']
    });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Session has expired or token is invalid.',
      errors: ['Invalid or expired token']
    });
    return;
  }

  req.user = payload;
  next();
}

export async function verifyUserPassword(email: string, plainTextPassword: string) {
  const data = db.getData();
  const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  const match = await bcrypt.compare(plainTextPassword, user.passwordHash);
  if (!match) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
