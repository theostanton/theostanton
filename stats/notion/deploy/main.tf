locals {
  envs = {for tuple in regexall("(.*)=(.*)", file("../.env")) : tuple[0] => tuple[1]}
}

module "notion" {
  source      = "./../../../deploy/instance/notion"
  label       = "Tests"
  parent_page = local.envs["TEST_NOTION_PARENT_PAGE"]
  token       = local.envs["NOTION_TOKEN"]
}