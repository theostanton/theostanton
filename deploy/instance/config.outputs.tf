output "domain_name" {
  value = local.domain_name
}

output "distribution_id" {
  value = aws_cloudfront_distribution.main.id
}

output "stats_url" {
  value = aws_api_gateway_domain_name.stats.domain_name
}

output "database_url" {
  value = local.variables.DATABASE_URL
  sensitive = true
}

output "envs" {
  value = local.envs
  sensitive = true
}
