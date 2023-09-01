import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})

let dbConnected:boolean = false

AppDataSource.initialize()
    .then(() => {
        dbConnected = true
    })
    .catch((error) => console.log(error))

export { AppDataSource, dbConnected }