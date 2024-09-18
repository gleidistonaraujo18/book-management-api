import { Request, Response } from 'express'
import HttpError from '../utils/Error';
import { IsbnValidator } from '../utils/IsbnValidator';
import Book from '../models/Book';
import { ValidationFields } from '../utils/ValidationFields';


class BookController {

    public static async createBook(request: Request, response: Response) {
        try {

            const { title, author, isbn, publicationDate, description, price, stockQuantity } = request.body

            ValidationFields.validateRequiredFields({ title, author, isbn, stockQuantity });

            if (!IsbnValidator.isValid(isbn)) throw new HttpError(400, "ISBN is invalid.")

            const [status, string] = await Book.createBook(title, author, isbn, publicationDate, description, price, stockQuantity)

            if (!status) throw new HttpError(400, string);

            return response.status(201).json({ message: string });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

}

export default BookController;