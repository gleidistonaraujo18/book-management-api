import { Model, DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/database'

interface StockAttributes {
    id?: number;
    title: string;
    author: string;
    isbn: string;
    publicationDate?: Date;
    description?: string;
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

class Stock extends Model<StockAttributes> {

    public id!: number;
    public title!: string;
    public author!: string;
    public isbn!: string;
    public publicationDate!: Date;
    public description!: string;
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
            const stock = await Stock.findByPk(id);
            if (!stock) throw new Error("Stock not found");

            return [true, stock];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unexpected error occurred"];
        }
    }

    public static async getAll(): Promise<[boolean, Stock[] | string]> {
        try {
            const stocks = await Stock.findAll();
            if (stocks.length === 0) throw new Error("No stocks found.");

            return [true, stocks];

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unexpected error occurred"];
        }
    }

    public static async createStock(title: string, author: string, isbn: string, publicationDate: Date, description: string, totalStock: number, reservedStock: number, minimumStock: number, lastRestockDate: Date, costPrice: number, salePrice: number, tax: number, category: string, publisher: string): Promise<[boolean, string]> {
        try {
            const existingStock = await Stock.findOne({ where: { [Op.or]: [{ isbn }, { title }] } });

            if (existingStock) {
                if (existingStock.isbn === isbn) throw new Error("ISBN already exists");
                if (existingStock.title === title) throw new Error("Title already exists");
            }

            await Stock.create({ title, author, isbn, publicationDate, description, totalStock, reservedStock, minimumStock, lastRestockDate, costPrice, salePrice, tax, category, publisher })

            return [true, "Stock registered successfully"]
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async updateStock(id: number, data: object): Promise<[boolean, string]> {
        try {

            if (!await Stock.findByPk(id)) throw new Error("Stock not found for update");

            await Stock.update(data, { where: { id } });

            return [true, "Data updated successfully."];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }

    }

    public static async deleteStock(id: number): Promise<[boolean, string]> {
        try {
            if (!await Stock.findByPk(id)) throw new Error("Stock not found for delete");

            await Stock.destroy({ where: { id: id } });

            return [true, "Stock deleted successfully"];

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }
}

Stock.init({
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
}, { sequelize, tableName: "stock" })


export default Stock;
