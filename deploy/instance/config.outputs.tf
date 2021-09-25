output "domain_name" {
  value = local.domain_name
}

output "distribution_id" {
  value = aws_cloudfront_distribution.main.id
}

output "stats_url" {
  value = aws_api_gateway_domain_name.stats.domain_name
}

output "analytics_page_url" {
  value = module.notion.page_url
}

output "envs" {
  value     = local.envs
  sensitive = true
}
