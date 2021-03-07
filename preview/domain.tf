data "terraform_remote_state" "deploy" {
  backend = "s3"

  config = {
    bucket = "theo.dev-state"
    key = "state"
    region = "us-east-1"
  }
}

resource "aws_route53_record" "main" {
  name = local.domain_name
  type = "CNAME"
  zone_id = data.terraform_remote_state.deploy.outputs.zone_id
  ttl = "300"
  records = [
    aws_s3_bucket.site.website_endpoint
  ]
}
