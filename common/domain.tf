resource "aws_route53_zone" "main" {
  name = var.base_url
}

resource "aws_acm_certificate" "main" {
  domain_name = var.base_url
  validation_method = "DNS"
  subject_alternative_names = [
    "*.${var.base_url}"]

  tags = {
    "Name":var.base_url
  }

  lifecycle {
    create_before_destroy = true
  }
}
