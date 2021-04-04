resource "aws_api_gateway_rest_api" "stats" {
  name = local.is_preview ?  "${var.branch}-stats.${var.base_url}" : "stats.${var.base_url}"
}

resource "aws_api_gateway_deployment" "stats" {
  triggers = {
    view: data.archive_file.click.output_sha,
    click: data.archive_file.click.output_sha,
  }
  depends_on = [
    aws_api_gateway_integration.view,
    aws_api_gateway_integration.click,
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
  domain_name = "${local.domain_prefix}stats.${var.base_url}"
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

//resource "aws_api_gateway_method" "root" {
//  rest_api_id = aws_api_gateway_rest_api.tomate.id
//  resource_id = aws_api_gateway_rest_api.tomate.root_resource_id
//  http_method = "POST"
//  authorization = "NONE"
//}
//
//resource "aws_api_gateway_integration" "root" {
//  rest_api_id = aws_api_gateway_rest_api.tomate.id
//  resource_id = aws_api_gateway_rest_api.tomate.root_resource_id
//  http_method = aws_api_gateway_method.root.http_method
//  type = "MOCK"
//  timeout_milliseconds = 29000
//
//  request_parameters = {
//    "integration.request.header.X-Authorization" = "'static'"
//  }
//
//  # Transforms the incoming XML request to JSON
//  request_templates = {
//    "application/xml" = <<EOF
//{
//   "body" : $input.json('$')
//}
//EOF
//  }
//}
