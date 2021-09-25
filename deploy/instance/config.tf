terraform {
  backend "s3" {
    bucket = "theo.dev-state"
    key    = "state"
    region = "us-east-1"
  }
}

terraform {
  required_providers {
    notion = {
      source  = "theostanton/notion"
      version = "0.3.2"
    }
  }
}

provider "aws" {
  profile = "theo.dev"
  region  = "us-east-1"
}

data "terraform_remote_state" "common" {
  backend = "s3"
  config  = {
    bucket = "theo.dev-state"
    key    = "common"
    region = "us-east-1"
  }
}

locals {
  is_preview    = var.branch != "master"
  domain_prefix = local.is_preview ? "${var.branch}-" : ""
  domain_suffix = local.is_preview ? "-${var.branch}" : ""
  domain_name   = local.is_preview ?  "${var.branch}.${var.base_url}" : var.base_url
  common        = {
    acm_certificate_arn = data.terraform_remote_state.common.outputs.acm_certificate_arn
    zone_id             = data.terraform_remote_state.common.outputs.zone_id
  }
  variables     = {
    NOTION_TOKEN                = var.notion_token
    NOTION_SESSIONS_DATABASE_ID = module.notion.sessions_database_id
    NOTION_EVENTS_DATABASE_ID   = module.notion.events_database_id
  }
  envs          = join("\n", flatten([
  for key, value in local.variables :[
    "${key}=${value}"
  ]
  ]))
}
