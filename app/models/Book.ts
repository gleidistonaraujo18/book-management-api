import { Model, DataTypes, where } from 'sequelize'
import { sequelize } from '../config/database'

interface BookAttributes {
    id?: number;
    title: string;
    author: string;
    isbn: string;
    publicationDate?: Date;
    description?: string;
    price?: number;
    stockQuantity: number;
}

class Book extends Model<BookAttributes> {
    public static async createBook(title: string, author: string, isbn: string, publicationDate: Date, description: string, price: number, stockQuantity: number): Promise<[boolean, string]> {
        try {

            if (await Book.findOne({ where: { isbn: isbn } })) throw new Error("ISBN already exists");

            if (await Book.findOne({ where: { title: title } })) throw new Error("Title already exists");

            await Book.create({ title, author, isbn, publicationDate, description, price, stockQuantity })

            return [true, "Book registered successfully"]
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    publicationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
}, { sequelize, tableName: "books" })


export default Book;