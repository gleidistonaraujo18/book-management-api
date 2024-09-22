import { Model, DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/database'

interface BookAttributes {
    id?: number;
    title: string;
    author: string;
    isbn: string;
    publicationDate?: Date;
    description?: string;
    availableStock: number;
    totalStock: number;
    reservedStock: number;
    minimumStock: number;
    lastRestockDate: Date;
    costPrice: number;
    salePrice: number;
    tax?: number;
    category?: string;
    publisher?: string;
}

class Book extends Model<BookAttributes> {

    public id!: number;
    public title!: string;
    public uthor!: string;
    public isbn!: string;
    public publicationDate!: Date;
    public description!: string;
    public availableStock!: number;
    public totalStock!: number;
    public reservedStock!: number;
    public minimumStock!: number;
    public lastRestockDate!: Date;
    public costPrice!: number;
    public salePrice!: number;
    public tax!: number;
    public category!: string;
    public publisher!: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static async getById(id: number): Promise<[boolean, object | string]> {
        try {
            const book = await Book.findByPk(id);
            if (!book) throw new Error("Book not found");

            return [true, book];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unexpected error occurred"];
        }
    }

    public static async getAll(): Promise<[boolean, Book[] | string]> {
        try {
            const books = await Book.findAll();
            if (books.length === 0) throw new Error("No books found.");

            return [true, books];

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unexpected error occurred"];
        }
    }

    public static async createBook(title: string, author: string, isbn: string, publicationDate: Date, description: string, availableStock: number, totalStock: number, reservedStock: number, minimumStock: number, lastRestockDate: Date, costPrice: number, salePrice: number, tax: number, category: string, publisher: string): Promise<[boolean, string]> {
        try {
            const existingBook = await Book.findOne({ where: { [Op.or]: [{ isbn }, { title }] } });

            if (existingBook) {
                if (existingBook.isbn === isbn) throw new Error("ISBN already exists");
                if (existingBook.title === title) throw new Error("Title already exists");
            }

            await Book.create({ title, author, isbn, publicationDate, description, availableStock, totalStock, reservedStock, minimumStock, lastRestockDate, costPrice, salePrice, tax, category, publisher })

            return [true, "Book registered successfully"]
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async updateBook(id: number, data: object): Promise<[boolean, string]> {
        try {

            if (!await Book.findByPk(id)) throw new Error("Book not found for update");

            await Book.update(data, { where: { id } });

            return [true, "Data updated successfully."];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }

    }

    public static async deleteBook(id: number): Promise<[boolean, string]> {
        try {
            if (!await Book.findByPk(id)) throw new Error("Book not found for delete");

            await Book.destroy({ where: { id: id } });

            return [true, "Book deleted successfully"];

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
    availableStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    totalStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    reservedStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    minimumStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lastRestockDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    costPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tax: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { sequelize, tableName: "books" })


export default Book;