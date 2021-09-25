import express from "express"
import cors from "cors"
import { Response, Request } from "express-serve-static-core"
import * as controllers from "@stats/controllers"
import { view, click } from "@stats/model"

const app = express()

app.use(cors())
app.use(express.json())

const port = 3000

async function viewRoute(req: Request, res: Response) {
  try {
    const request: view.Request = req.body
    const response = await controllers.view.invoke(request)
    res.json(response)
  } catch (err) {
    res.json({
      success: false,
      error: err.message
    })
  }
}

async function clickRoute(req: Request, res: Response) {
  try {
    const request: click.Request = req.body
    const response = await controllers.click.invoke(request)
    res.json(response)
  } catch (err) {
    res.json({
      success: false,
      error: err.message
    })
  }
}

app.post("/view", viewRoute)
app.post("/click", clickRoute)

app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
