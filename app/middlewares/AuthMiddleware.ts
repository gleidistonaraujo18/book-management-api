import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export default function authentication(request: AuthenticatedRequest, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) return response.status(401).json({ error: "Unauthorized: Token missing or malformed" });

    const token = authorization.split(' ')[1];
    const secret = process.env.SECRET;

    if (!secret) {
        console.error("JWT secret is missing in environment variables.");
        return response.status(500).json({ error: "Internal Server Error" });
    }

    jwt.verify(token, secret, (error, user) => {
        if (error) {
            return response.status(403).json({ error: "Forbidden" });
        }

        request.user = user;
        next();
    });
}
