locals {
  envs = {for tuple in regexall("(.*)=(.*)", file("../.env")) : tuple[0] => tuple[1]}
}

module "notion" {
  source = "./../../../deploy/instance/notion"
  label  = "Tests - ${random_pet.label.id}"
  token  = local.envs["NOTION_TOKEN"]
}


resource "random_pet" "label" {

}


resource "local_file" "env_test" {
  filename = "${path.module}/../.env.test"
  content  = <<EOF
NOTION_SESSIONS_DATABASE_ID=${module.notion.sessions_database_id}
NOTION_EVENTS_DATABASE_ID=${module.notion.events_database_id}
NOTION_TOKEN=${local.envs["NOTION_TOKEN"]}
EOF
}

output "page_url" {
  value = module.notion.page_url
}