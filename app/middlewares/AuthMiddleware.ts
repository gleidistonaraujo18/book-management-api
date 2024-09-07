import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function authentication(request: any, response: any, next: any) {
    const { authorization } = request.headers;

    if (!authorization || authorization === undefined) return response.status(401).json({ error: "Unauthorized" });

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET || '', (error: any, user: any) => {
        if (error) return response.status(403).json({ error: "Forbidden" });

        request.user = user;
        next();
    });

}