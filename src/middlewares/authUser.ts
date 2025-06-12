import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  id: string;
}

const authUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'bad auth' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'bad auth' });
    }
    const { email, id } = decoded as JwtPayload;
    req.body.userEmail = email;
    req.body.userId = id;
    next();
  });
};

export default authUser;
