module "notion" {
  source = "./notion"
  label  = local.domain_name
  token  = var.notion_token
}