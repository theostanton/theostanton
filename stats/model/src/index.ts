require("dotenv").config({
    path: process.env.ENV_PATH
})

export {view, click} from "./controllers"
export {id} from "./utils"
