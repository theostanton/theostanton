data "archive_file" "click" {
  type = "zip"
  source_file = "../dist/stats/click.js"
  output_path = "../dist/click.zip"
}

resource "aws_lambda_function" "click" {
  function_name = "theodev-click${local.domain_suffix}"
  filename = data.archive_file.click.output_path
  source_code_hash = data.archive_file.click.output_base64sha256
  handler = "click.handler"
  role = aws_iam_role.lambda.arn
  runtime = "nodejs14.x"
  memory_size = 128
  timeout = 15

  environment {
    variables = local.variables
  }
}

resource "aws_lambda_permission" "click" {
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.click.arn
  principal = "apigateway.amazonaws.com"
}

resource "aws_api_gateway_resource" "click" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  parent_id = aws_api_gateway_rest_api.stats.root_resource_id
  path_part = "click"
}


resource "aws_api_gateway_method" "click" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  resource_id = aws_api_gateway_resource.click.id
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "click" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  resource_id =  aws_api_gateway_resource.click.id
  http_method = aws_api_gateway_method.click.http_method
  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = aws_lambda_function.click.invoke_arn
}

resource "aws_cloudwatch_log_group" "click" {
  name = "/aws/lambda/${aws_lambda_function.click.function_name}"
  retention_in_days = 14
}
