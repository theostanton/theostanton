terraform {
  backend "s3" {
    bucket = "theo.dev-state"
    key = "state"
    region = "us-east-1"
  }
}

provider "aws" {
  profile = "default"
  region = "us-east-1"
}

data "terraform_remote_state" "common" {
  backend = "s3"

  config = {
    bucket = "theo.dev-state"
    key = "common"
    region = "us-east-1"
  }
}

locals {
  is_preview = var.branch != "default"
  domain_name = local.is_preview ?  "${var.branch}.${var.base_url}" : var.base_url
  common = {
    acm_certificate_arn = data.terraform_remote_state.common.outputs.acm_certificate_arn
    zone_id = data.terraform_remote_state.common.outputs.zone_id
  }
}
