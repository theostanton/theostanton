resource "aws_s3_bucket" "site" {
  bucket = local.domain_name
  acl = "public-read"

  cors_rule {
    allowed_headers = [
      "*"]
    allowed_methods = [
      "PUT",
      "POST"]
    allowed_origins = [
      "*"]
    expose_headers = [
      "ETag"]
    max_age_seconds = 3000
  }

  policy = data.aws_iam_policy_document.site.json

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

data "aws_iam_policy_document" "site" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      identifiers = [
        "*"]
      type = "AWS"
    }
    resources = [
      "arn:aws:s3:::${local.domain_name}/*"
    ]
  }
}

resource "aws_route53_record" "site_a_record" {
  zone_id = local.common.zone_id
  name = local.domain_name
  type = "A"
  alias {
    name = aws_cloudfront_distribution.main.domain_name
    zone_id = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_s3_bucket_object" "site" {
  content_type = "text/html"
  for_each = fileset("../dist/site", "**")
  bucket = aws_s3_bucket.site.id
  key = each.value
  source = "../dist/site/${each.value}"
  etag = filemd5("../dist/site/${each.value}")
}

resource "aws_route53_record" "plausible" {
  count = local.is_preview ? 0 : 1

  zone_id = local.common.zone_id
  ttl = "300"
  name = "stats"
  type = "CNAME"
  records = [
    "custom.plausible.io"]
}
