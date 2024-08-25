import { User } from "../../models/User";
import HttpError from "../../utils/Error";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";

class UserController {
    public static async getById(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id)

            if (isNaN(id)) {
                throw new HttpError(400, "Invalid user ID.");
            }
            const user = await User.getById(id);

            if (user[0] === false) throw new HttpError(400, "User not found.")

            return response.status(200).json(user[1]);
        } catch (error: any) {
            return response.status(error.statusCode || 500).json({ error: error.message || "An unknown error occurred" });

        }
    }

    public static async createUser(request: Request, response: Response) {
        try {
            const { name, email, password, isActive } = request.body;
            if (!name || !email || !password || typeof isActive !== 'boolean') {
                const missingFields = ['name', 'email', 'password', 'isActive'].filter(field => !request.body[field]);
                throw new HttpError(400, `Please fill in all required fields.: ${missingFields.join(', ')}`);
            }
            const hashPass = await bcrypt.hash(password, 10);
            const user = await User.createUser(name, email, hashPass, isActive);

            if (user[0] === false) throw new HttpError(400, user[1])

            return response.status(201).json({ message: user[1] });
        } catch (error: any) {
            return response.status(error.statusCode || 500).json({ error: error.message || "An unknown error occurred" });

        }
    }

    public static async getAll(request: Request, response: Response) {
        try {

            const users = await User.getAll();
            if (users[0] === false) throw new HttpError(400, users[1] as string)

            return response.status(200).json(users[1])
        } catch (error: any) {
            return response.status(error.statusCode || 500).json({ error: error.message || "An unknown error occurred" });

        }
    }

    public static async delete(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id)

            if (isNaN(id)) {
                throw new HttpError(400, "Invalid user ID.");
            }

            const deleteById = await User.delete(id);
            if (deleteById[0] === false) throw new HttpError(400, deleteById[1])

            return response.status(200).json({ message: deleteById[1] });
        } catch (error: any) {
            return response.status(error.statusCode || 500).json({ error: error.message || "An unknown error occurred" });

        }

    }

}

export default UserController;