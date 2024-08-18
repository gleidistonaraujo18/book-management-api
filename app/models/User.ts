import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database'

interface UserAttributers {
    id?: number,
    name: string,
    email: string,
    password: string,
    isActive: boolean
}

class User extends Model<UserAttributers> {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public isActive!: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async getUserById(id: number): Promise<[boolean, User | string]> {
        try {
            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'email', 'isActive', 'createdAt', 'updatedAt']
            });
            if (!user) throw new Error("User not found");

            return [true, user];
        } catch (error: any) {
            return [false, error.message]
        }
    }

    public async register(name: string, email: string, password: string, isActive: boolean): Promise<[boolean, string]> {
        try {
            const verifyExists = await User.findOne({ where: { email: email } });
            if (verifyExists) throw new Error("User already registered.");

            const user = await User.create({ name, email, password, isActive });
            if (!user) throw new Error("Error registering user.");

            return [true, "User successfully registered."]
        } catch (error: any) {
            return [false, error.message]
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