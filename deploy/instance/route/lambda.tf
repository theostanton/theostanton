data "archive_file" "lambda" {
  type = "zip"
  source_file = var.lambda.file_path
  output_path = "dist/${var.api.path}.zip"
}

resource "aws_lambda_function" "lambda" {
  function_name = var.lambda.function_name
  filename = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256
  handler = var.lambda.handler
  role = var.lambda.role_arn
  runtime = "nodejs14.x"
  memory_size = 128
  timeout = 15

  environment {
    variables = var.lambda.variables
  }
}

resource "aws_lambda_permission" "lambda" {
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.arn
  principal = "apigateway.amazonaws.com"
}

resource "aws_cloudwatch_log_group" "lambda" {
  name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 14
}
