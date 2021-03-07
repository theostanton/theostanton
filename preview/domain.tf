resource "aws_route53_zone" "main" {
  name = var.base_url
}

resource "aws_route53_record" "main" {
  name = local.domain_name
  type = "CNAME"
  zone_id = aws_route53_zone.main.zone_id
  ttl = "300"
  records = [
    aws_s3_bucket.site.website_endpoint
  ]
}
