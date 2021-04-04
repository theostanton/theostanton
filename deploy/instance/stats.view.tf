data "archive_file" "view" {
  type = "zip"
  source_file = "../dist/stats/view.js"
  output_path = "dist/view.zip"
}

resource "aws_lambda_function" "view" {
  function_name = "theodev-view${local.domain_suffix}"
  filename = data.archive_file.view.output_path
  source_code_hash = data.archive_file.view.output_base64sha256
  handler = "view.handler"
  role = aws_iam_role.lambda.arn
  runtime = "nodejs14.x"
  memory_size = 128
  timeout = 15

  environment {
    variables = local.variables
  }
}

resource "aws_lambda_permission" "view" {
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.view.arn
  principal = "apigateway.amazonaws.com"
}

resource "aws_api_gateway_resource" "view" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  parent_id = aws_api_gateway_rest_api.stats.root_resource_id
  path_part = "view"
}


resource "aws_api_gateway_method" "view" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  resource_id = aws_api_gateway_resource.view.id
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "view" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  resource_id = aws_api_gateway_resource.view.id
  http_method = aws_api_gateway_method.view.http_method
  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = aws_lambda_function.view.invoke_arn
}

resource "aws_cloudwatch_log_group" "view" {
  name = "/aws/lambda/${aws_lambda_function.view.function_name}"
  retention_in_days = 14
}
