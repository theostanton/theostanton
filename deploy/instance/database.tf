resource "random_password" "database" {
  length = 16
  special = false
}

resource "aws_db_instance" "database" {
  identifier = "theodev"
  instance_class = "db.t2.micro"
  apply_immediately = true
  allocated_storage = 10
  engine = "postgres"
  name = "stats"
  username = "super"
  password = random_password.database.result
  skip_final_snapshot = true
  publicly_accessible = true
  vpc_security_group_ids = [
    aws_security_group.open.id]
}

resource "null_resource" "schema" {
  triggers = {
    "address":aws_db_instance.database.address
  }
  provisioner "local-exec" {
    command = "psql ${local.variables.DATABASE_URL} -f ./database.schema.sql"
  }
}

resource "aws_security_group" "open" {
  name = "theodev-open-${local.domain_suffix}"

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [
      "0.0.0.0/0"]
  }

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [
      "0.0.0.0/0"]
  }
}

resource "aws_route53_record" "database" {
  name = local.is_preview ?  "${var.branch}-database.${var.base_url}" : "database.${var.base_url}"
  zone_id = local.common.zone_id
  type = "CNAME"
  ttl = "300"
  records = [
    aws_db_instance.database.address]
}
