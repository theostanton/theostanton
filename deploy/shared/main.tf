terraform {
  backend "s3" {
    bucket = "theo.dev-state"
    key = "common"
    region = "us-east-1"
  }
}

provider "aws" {
  profile = "default"
  region = "us-east-1"
}
