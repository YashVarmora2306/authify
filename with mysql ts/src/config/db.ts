import { Dialect, Sequelize } from "sequelize";
import logger from "../utils/logger";

export const sequelize = new Sequelize(process.env.DATABASE as string, process.env.DB_USERNAME as string, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT as Dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info("Connection has been established successfully");

        await sequelize.sync({ force: false });
        logger.info("Database synchronized successfully.");

    } catch (error) {
        logger.error("MySql connection error:", error);
        process.exit(1)
    }
}

export default connectDB;