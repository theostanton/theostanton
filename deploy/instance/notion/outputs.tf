output "page_url" {
  value = notion_page.parent.url
}

output "sessions_database_id" {
  value = notion_database.sessions.id
}

output "events_database_id" {
  value = notion_database.events.id
}