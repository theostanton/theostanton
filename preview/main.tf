terraform {
  backend "s3" {
    bucket = "theo.dev-state"
    key = "preview-states "
    region = "us-east-1"
  }
}

provider "aws" {
  profile = "default"
  region = "us-east-1"
}

locals {
  domain_name = "${var.slug}.${var.base_url}"
}
