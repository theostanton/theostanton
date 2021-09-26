terraform {
  required_providers {
    notion = {
      source  = "theostanton/notion"
      version = "0.3.2"
    }
  }
}

provider "notion" {
  token = var.token
}

data "notion_page" "analytics" {
  query = "Analytics"
}

resource "notion_page" "parent" {
  title          = var.label
  parent_page_id = data.notion_page.analytics.id
}

# Sessions
resource "notion_database" "sessions" {
  title              = "Sessions"
  parent             = notion_page.parent.id
  title_column_title = "ID"
}

resource "notion_database_property_relation" "sessions_to_events" {
  database         = notion_database.sessions.id
  related_database = notion_database.events.id
  name             = "Events"
}

resource "notion_database_property_rich_text" "sessions_user" {
  database = notion_database.sessions.id
  name     = "User"
}

resource "notion_database_property_date" "sessions_date" {
  database = notion_database.sessions.id
  name     = "Date"
}

resource "notion_database_property_rollup" "sessions_start" {
  database          = notion_database.sessions.id
  relation_property = notion_database_property_relation.sessions_to_events.name
  rollup_property   = notion_database_property_date.events_date.name
  name              = "Start"
  function          = "show_original"
}

# Events
resource "notion_database" "events" {
  title              = "Events"
  parent             = notion_page.parent.id
  title_column_title = "Event"
}

resource "notion_database_property_date" "events_date" {
  database = notion_database.events.id
  name     = "Date"
}