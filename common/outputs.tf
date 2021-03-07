output "acm_certificate_arn" {
  value = aws_acm_certificate.main.arn
}

output "zone_id" {
  value = aws_route53_zone.main.zone_id
}
