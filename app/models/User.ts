import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'

interface UserAttributes {
    id?: number,
    name: string,
    email: string,
    password: string,
    isActive: boolean
}


class User extends Model<UserAttributes> {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public isActive!: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static async getById(id: number): Promise<[boolean, User | string]> {
        try {
            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'email', 'isActive', 'createdAt', 'updatedAt']
            });
            if (!user) throw new Error("User not found");

            return [true, user];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }


    public static async createUser(name: string, email: string, password: string, isActive: boolean): Promise<[boolean, string]> {
        try {
            const verifyExists = await User.findOne({ where: { email: email } });
            if (verifyExists) throw new Error("User already registered.");

            const user = await User.create({ name, email, password, isActive });
            if (!user) throw new Error("Error registering user.");

            return [true, "User successfully registered."]
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async getAll(): Promise<[boolean, User[] | string]> {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'isActive', 'createdAt', 'updatedAt']
            });
            if (!users) throw new Error("Failed to retrieve users");

            return [true, users];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async delete(id: number): Promise<[boolean, string]> {
        try {

            const verifyExists = await User.findByPk(id);
            if (!verifyExists) throw new Error("User not found for delete");

            const rowsDeleted = await User.destroy({ where: { id } });
            if (!rowsDeleted) throw new Error("Error when deleting user");

            return [true, "User deleted successfully"];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }

    }

    public static async updateUserById(id: number, data: object): Promise<[boolean, string]> {
        try {
            const verifyExists = await User.findByPk(id);
            if (!verifyExists) throw new Error("User not found for update");

            const update = await User.update(data, { where: { id } });

            if (!update) throw new Error("Error updating user data");

            return [true, "Data updated successfully."];

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async authenticate(email: string) {
        try {
            const user = await User.findOne({ where: { email: email} });
            if (!user) throw new Error("User not found");

            return [true, user];

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }
}


User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize,
    tableName: 'users'
})


export { User }