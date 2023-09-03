import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const port = parseInt(process.env.POSTGRES_PORT || '')

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number.isInteger(port) ? port : 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
    extra: {
        poolSize: 5
    }
})


export { AppDataSource }