import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from "aws-lambda"

import { click as controller } from "@stats/controllers"
import { click } from "@stats/model"

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const request: click.Request = JSON.parse(event.body)
  const response = await controller.invoke(request)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

module.exports = {
  handler
}
