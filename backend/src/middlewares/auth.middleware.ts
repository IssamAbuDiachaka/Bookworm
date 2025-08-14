import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';




export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string};
}

  const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  
  //Get token from "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  const authenticateJWT = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(authenticateJWT, process.env.JWT_SECRET!) as JwtPayload;

    // Attach decoded payload to req.user
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    // continue
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default authenticateJWT;
