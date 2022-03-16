resource "aws_s3_bucket" "site" {
  bucket = local.domain_name
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.bucket
  policy = data.aws_iam_policy_document.site.json
}

resource "aws_s3_bucket_acl" "site" {
  bucket = aws_s3_bucket.site.bucket
  acl    = "public-read"
}

resource "aws_s3_bucket_cors_configuration" "site" {
  bucket = aws_s3_bucket.site.bucket

  cors_rule {
    allowed_headers = [
      "*"
    ]
    allowed_methods = [
      "PUT",
      "POST"
    ]
    allowed_origins = [
      "*"
    ]
    expose_headers = [
      "ETag"
    ]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.bucket


  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

data "aws_iam_policy_document" "site" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      identifiers = [
        "*"
      ]
      type = "AWS"
    }
    resources = [
      "arn:aws:s3:::${local.domain_name}/*"
    ]
  }
}

resource "aws_route53_record" "site_a_record" {
  zone_id = local.common.zone_id
  name    = local.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = false
  }
}

//data "archive_file" "site" {
//  type = "zip"
//  output_path = "../dist/site.zip"
//  source_dir = "../dist/site"
//}

resource "aws_s3_object" "site" {
  content_type = "text/html"
  for_each     = fileset("../dist/site", "**")
  bucket       = aws_s3_bucket.site.bucket
  key          = each.value
  source       = "../dist/site/${each.value}"
  etag         = filemd5("../dist/site/${each.value}")
}
