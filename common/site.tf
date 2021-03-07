resource "aws_s3_bucket" "site_redirect" {
  bucket = "www.${var.base_url}"
  acl = "public-read"

  website {
    redirect_all_requests_to = var.base_url
  }

}
