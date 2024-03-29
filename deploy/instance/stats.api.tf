locals {
  api_domain_name = "${local.domain_prefix}api.${var.base_url}"
}

resource "aws_api_gateway_rest_api" "stats" {
  name = local.api_domain_name
}

resource "aws_api_gateway_deployment" "stats" {
  triggers = {
    view: module.view.hash,
    click: module.click.hash,
  }
  depends_on = [
    module.click,
    module.view,
  ]
  rest_api_id = aws_api_gateway_rest_api.stats.id
  stage_name = "v1"
  stage_description = md5(file("stats.api.tf"))

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_domain_name" "stats" {
  certificate_arn = local.common.acm_certificate_arn
  domain_name = local.api_domain_name
}

resource "aws_api_gateway_gateway_response" "error" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  status_code = 403
  response_type = "UNAUTHORIZED"

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_route53_record" "stats" {
  name = aws_api_gateway_domain_name.stats.domain_name
  type = "A"
  zone_id = local.common.zone_id

  alias {
    evaluate_target_health = true
    name = aws_api_gateway_domain_name.stats.cloudfront_domain_name
    zone_id = aws_api_gateway_domain_name.stats.cloudfront_zone_id
  }
}

resource "aws_api_gateway_base_path_mapping" "stats" {
  api_id = aws_api_gateway_rest_api.stats.id
  domain_name = aws_api_gateway_domain_name.stats.domain_name
  stage_name = aws_api_gateway_deployment.stats.stage_name
}


resource "aws_api_gateway_gateway_response" "response_4xx" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  response_type = "DEFAULT_4XX"

  response_templates = {
    "application/json" = "{'message':$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_api_gateway_gateway_response" "response_5xx" {
  rest_api_id = aws_api_gateway_rest_api.stats.id
  response_type = "DEFAULT_5XX"

  response_templates = {
    "application/json" = "{'message':$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin" = "'*'"
  }
}
