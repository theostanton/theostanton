resource "aws_api_gateway_resource" "lambda" {
  rest_api_id = var.api.id
  parent_id = var.api.root_resource_id
  path_part = var.api.path
}


resource "aws_api_gateway_method" "post" {
  rest_api_id = var.api.id
  resource_id = aws_api_gateway_resource.lambda.id
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "post" {
  rest_api_id = var.api.id
  resource_id = aws_api_gateway_resource.lambda.id
  http_method = aws_api_gateway_method.post.http_method
  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = aws_lambda_function.lambda.invoke_arn
}
