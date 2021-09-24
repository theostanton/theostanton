# Sessions
resource "notion_database" "sessions" {
  title              = "${var.base_url} - Sessions"
  parent             = var.notion_parent_page
  title_column_title = "ID"
}

resource "notion_database_property_relation" "sessions_to_events" {
  database    = notion_database.sessions.id
  database_id = notion_database.events.id
  name        = "Events"
}

resource "notion_database_property_rich_text" "sessions_user" {
  database = notion_database.sessions.id
  name     = "User"
}

# Events
resource "notion_database" "events" {
  title              = "${var.base_url} - Events"
  parent             = var.notion_parent_page
  title_column_title = "Event"
}

#resource "notion_database_property_date" "events_date" {
#  database = notion_database.events.id
#  name     = "Date"
#}