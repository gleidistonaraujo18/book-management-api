import { Request, Response } from 'express'
import HttpError from '../utils/Error';
import { IsbnValidator } from '../utils/IsbnValidator';
import Book from '../models/Book';
import { ValidationFields } from '../utils/ValidationFields';
import { isEmptyObject } from "../utils/ObjectValidate";

class BookController {

    public static async getById(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");
            const [success, message] = await Book.getById(Number(request.params.id));
            if (!success) throw new HttpError(400, message as string);

            return response.status(200).json(message)
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async getAll(request: Request, response: Response) {
        try {

            const [success, message] = await Book.getAll();
            if (!success) throw new HttpError(400, message as string)

            return response.status(200).json(message)

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async createBook(request: Request, response: Response) {
        try {
            const { title, author, isbn, publicationDate, description, availableStock, totalStock, reservedStock, minimumStock, lastRestockDate, costPrice, salePrice, tax, category, publisher } = request.body

            if (isEmptyObject(request.body)) throw new HttpError(400, "No fields provided for created.")

            ValidationFields.validateRequiredFields({ title, author, isbn, availableStock, totalStock, minimumStock, lastRestockDate, costPrice, salePrice });

            if (!IsbnValidator.isValid(isbn)) throw new HttpError(400, "ISBN is invalid.")

            const [status, string] = await Book.createBook(title, author, isbn, publicationDate, description, availableStock, totalStock, reservedStock, minimumStock, lastRestockDate, costPrice, salePrice, tax, category, publisher)

            if (!status) throw new HttpError(400, string);

            return response.status(201).json({ message: string });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async updateBook(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            if (isEmptyObject(request.body)) throw new HttpError(400, "No fields provided for update.");

            const [success, message] = await Book.updateBook(Number(request.params.id), request.body);

            if (!success) throw new HttpError(400, message);

            return response.status(200).json({ message: message });

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }

    }

    public static async deleteBook(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            const [success, message] = await Book.deleteBook(Number(request.params.id));
            if (!success) throw new HttpError(400, message);

            return response.status(200).json({ message: message });

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }

    }
}

export default BookController;