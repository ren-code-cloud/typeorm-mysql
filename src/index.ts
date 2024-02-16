import express from "express";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import userRoute from "./routes/user.route";
import { Client } from "./entities/Client";

dotenv.config();
const app = express();

function generateUUID(): string {
  // Generate a random hexadecimal string of length 4
  const hex = () =>
    Math.floor(Math.random() * 0xffff)
      .toString(16)
      .padStart(4, "0");

  // Generate UUID format string
  return `${hex()}-${hex()}-${hex()}-${hex()}-${hex()}${hex()}${hex()}`;
}

const getConfig = () => {
  return {
    type: "mysql",
    host: process.env.MYSQL_DB_HOST,
    port: Number(process.env.MYSQL_DB_PORT),
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
    entities: [Client],
    migrations: ["src/migrations/*.ts"],
    synchronize: true,
    logging: true,
  } as DataSourceOptions;
};

const main = async () => {
  try {
    const AppDataSource = new DataSource(getConfig());
    await AppDataSource.initialize(); // Wait for database initialization

    console.log("Database connected successfully!");
    const uiid = generateUUID();
    const newClient = new Client(
      uiid,
      "John",
      "Doe",
      "john.doe@example.com",
      "1234567890",
      1000,
      true,
      ["Jane", "Doe"]
    );

    await newClient.save();

    console.log("Client saved successfully!");
    app.use("/api/test", userRoute);
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Error connecting to database");
  }
};

main();
