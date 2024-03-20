import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { StatusCode } from '../utils/enums';

export default function isCurrentUserValid (
  req: any,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.get('Authorization')?.split(' ')[1];
    let decodedToken: string | jwt.JwtPayload | null = null; // Initialize with null
    if (token) {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    }
    if (!decodedToken) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: 'Access Denied',
      });
    }
    req.username = decodedToken.username as string;
    next();
  } catch (e: unknown) {
    next(e);
  }
}
