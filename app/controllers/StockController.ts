import { Request, Response } from 'express'
import HttpError from '../utils/Error';
import { IsbnValidator } from '../utils/IsbnValidator';
import Stock from '../models/Stock';
import { ValidationFields } from '../utils/ValidationFields';
import { isEmptyObject } from "../utils/ObjectValidate";

class StockController {

    public static async getById(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");
            const [success, message] = await Stock.getById(Number(request.params.id));
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

            const [success, message] = await Stock.getAll();
            if (!success) throw new HttpError(400, message as string)

            return response.status(200).json(message)

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async createStock(request: Request, response: Response) {
        try {
            const { title, author, isbn, publicationDate, description, totalStock, reservedStock, minimumStock, lastRestockDate, costPrice, salePrice, tax, category, publisher } = request.body

            if (isEmptyObject(request.body)) throw new HttpError(400, "No fields provided for created.")

            ValidationFields.validateRequiredFields({ title, author, isbn, totalStock, minimumStock, lastRestockDate, costPrice, salePrice });

            if (!IsbnValidator.isValid(isbn)) throw new HttpError(400, "ISBN is invalid.")

            const [status, string] = await Stock.createStock(title, author, isbn, publicationDate, description, totalStock, reservedStock, minimumStock, lastRestockDate, costPrice, salePrice, tax, category, publisher)

            if (!status) throw new HttpError(400, string);

            return response.status(201).json({ message: string });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async updateStock(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            if (isEmptyObject(request.body)) throw new HttpError(400, "No fields provided for update.");

            const [success, message] = await Stock.updateStock(Number(request.params.id), request.body);

            if (!success) throw new HttpError(400, message);

            return response.status(200).json({ message: message });

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }

    }

    public static async deleteStock(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            const [success, message] = await Stock.deleteStock(Number(request.params.id));
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

export default StockController;
