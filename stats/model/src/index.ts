require("dotenv").config({
  path: process.env.ENV_PATH
})

export * from "./model"
export * as database from "./database"
export { view, click } from "./controllers"
