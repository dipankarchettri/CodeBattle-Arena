import type { Request, Response, NextFunction } from "express";

// This middleware runs AFTER requireAuth and checks the user's role.
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
    return next(); // User is an admin, proceed.
  }
  
  // User is not an admin, deny access.
  return res.status(403).json({ message: "Forbidden: Administrator access required." });
}
