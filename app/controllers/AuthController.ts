import { Request, Response } from "express";
import { User } from "../models/User";
import HttpError from "../utils/Error";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import isInvalidEmail from "../utils/EmailValidator";
import jwt from 'jsonwebtoken'

dotenv.config();

class AuthController {
    public static async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            if (!email || !password) throw new HttpError(400, "Email and password are required.");
            if (isInvalidEmail(email)) throw new HttpError(400, "Invalid email format");

            const [success, message] = await User.authenticate(email);
            if (!success) throw new HttpError(400, message as string)

            const user = message as { id: number, name: string, email: string, password: string, }

            if (await bcrypt.compare(password, user.password) === false) throw new HttpError(401, "Invalid password");
            return response.status(200).json({ token: jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRET || '', { expiresIn: '1h' }) });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }

    }
}

export default AuthController;