module "notion" {
  source      = "./notion"
  label       = var.base_url
  parent_page = var.notion_parent_page
  token       = var.notion_token
}