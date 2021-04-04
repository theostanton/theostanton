module "click" {
  source = "./route"
  api = {
    path = "click"
    id = aws_api_gateway_rest_api.stats.id
    root_resource_id = aws_api_gateway_rest_api.stats.root_resource_id
    allow_origin = "*"
  }
  lambda = {
    file_path = "../dist/stats/click.js"
    handler = "click.handler"
    function_name = "theodev-click${local.domain_suffix}"
    role_arn = aws_iam_role.lambda.arn
    variables = local.variables
  }
}

module "view" {
  source = "./route"
  api = {
    path = "view"
    id = aws_api_gateway_rest_api.stats.id
    root_resource_id = aws_api_gateway_rest_api.stats.root_resource_id
    allow_origin = "*"
  }
  lambda = {
    file_path = "../dist/stats/view.js"
    handler = "view.handler"
    function_name = "theodev-view${local.domain_suffix}"
    role_arn = aws_iam_role.lambda.arn
    variables = local.variables
  }
}
