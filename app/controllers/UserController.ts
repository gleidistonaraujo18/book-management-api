import { User } from "../models/User";
import HttpError from "../utils/Error";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { isEmptyObject } from "../utils/ObjectValidate";
import isInvalidEmail from "../utils/EmailValidator";
import { ValidationFields } from "../utils/ValidationFields";

class UserController {
    /**
     * @param {Request} request - O objeto de requisição.
     * @param {Response} response - O objeto de resposta.
     */

    public static async getById(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            const [success, user] = await User.getById(Number(request.params.id));

            if (!success) throw new HttpError(404, user as string);

            return response.status(200).json({ user });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async createUser(request: Request, response: Response) {
        try {
            const { name, email, password, isActive } = request.body;

            ValidationFields.validateRequiredFields({ name, email, password, isActive })

            if (isInvalidEmail(email)) throw new HttpError(400, "Invalid email format");

            const hashPass = await bcrypt.hash(password, 10);
            const [success, message] = await User.createUser(name, email, hashPass, isActive);

            if (!success) throw new HttpError(400, message);

            return response.status(201).json({ message: message });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async getAll(request: Request, response: Response) {
        try {

            const [success, message] = await User.getAll();
            if (!success) throw new HttpError(400, message as string)

            return response.status(200).json(message)
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async delete(request: Request, response: Response) {
        try {

            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            const [success, message] = await User.delete(Number(request.params.id));

            if (!success) throw new HttpError(400, message);

            return response.status(200).json({ message: message });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }


    public static async updateUser(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            if (isEmptyObject(request.body)) throw new HttpError(400, "No fields provided for update.");
            if (isInvalidEmail(request.body.email)) throw new HttpError(400, "Invalid email format");

            const [success, message] = await User.updateUser(Number(request.params.id), request.body);

            if (!success) throw new HttpError(400, message);

            return response.status(200).json({ message: "User updated successfully." });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

}



export default UserController;