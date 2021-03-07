output "domain_name" {
  value = local.domain_name
}

output "distribution_id" {
  value = aws_cloudfront_distribution.main.id
}
