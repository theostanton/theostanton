locals {
  endpoint = "http://localhost:4566"
}

provider "aws" {
  access_key = "mock_access_key"
  region     = "us-east-1"
  secret_key = "mock_secret_key"

  s3_force_path_style         = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    apigateway     = local.endpoint
    cloudformation = local.endpoint
    cloudwatch     = local.endpoint
    dynamodb       = local.endpoint
    es             = local.endpoint
    firehose       = local.endpoint
    iam            = local.endpoint
    kinesis        = local.endpoint
    lambda         = local.endpoint
    route53        = local.endpoint
    redshift       = local.endpoint
    rds            = local.endpoint
    s3             = local.endpoint
    secretsmanager = local.endpoint
    ses            = local.endpoint
    sns            = local.endpoint
    sqs            = local.endpoint
    ssm            = local.endpoint
    stepfunctions  = local.endpoint
    sts            = local.endpoint
  }
}

resource "random_password" "database" {
  length  = 6
  special = false
}

resource "aws_db_subnet_group" "default" {
  name       = "main"
  subnet_ids = [aws_subnet.frontend.id, aws_subnet.backend.id]

  tags = {
    Name = "My DB subnet group"
  }
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 3.0"

  identifier = "demodb"

  engine            = "postgres"
  instance_class    = "db.t2.large"
  allocated_storage = 5

  name     = "demodb"
  username = "super"
  password = "password"

  iam_database_authentication_enabled = true

#  vpc_security_group_ids = ["sg-12345678"]

#  subnet_ids = ["subnet-12345678", "subnet-87654321"]

}

output "url" {
  value = module.db.db_instance_address
}