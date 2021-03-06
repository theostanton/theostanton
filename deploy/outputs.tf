output "s3_url" {
  value = aws_s3_bucket.site.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "url" {
  value = var.domain_name
}

output "distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}
