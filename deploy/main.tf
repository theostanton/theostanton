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
