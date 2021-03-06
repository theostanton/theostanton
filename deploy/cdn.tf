locals {
  s3_origin_id = "primaryS3"
}


resource "aws_cloudfront_distribution" "s3_distribution" {

  origin {
    domain_name = aws_s3_bucket.site.website_endpoint
    origin_id = local.s3_origin_id

    custom_origin_config {
      http_port = "80"
      https_port = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2"]
    }
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD"]
    cached_methods = [
      "GET",
      "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress = true
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }

  aliases = [
    var.domain_name,
    "www.${var.domain_name}"
  ]

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations = [
        "US"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.main.arn
    ssl_support_method = "sni-only"
  }
}
