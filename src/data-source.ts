import "reflect-metadata"
import { DataSource } from "typeorm"
import { Recept } from "./entity/Recept"
import {Ingredient} from "./entity/Ingredient";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5411,
    username: "postgres",
    password: "password",
    database: "ingredienten",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [Recept, Ingredient],
    migrations: [],
    subscribers: [],
})
