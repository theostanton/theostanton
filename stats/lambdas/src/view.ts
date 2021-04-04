import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from "aws-lambda"


import { view as controller } from "@stats/controllers"
import { view } from "@stats/model"

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const request: view.Request = JSON.parse(event.body)
  const response = await controller.invoke(request)
  return {
    statusCode: 200,
    body: JSON.stringify(response, null, 4)
  }
}

module.exports = {
  handler
}
