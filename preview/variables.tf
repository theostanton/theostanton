variable "slug" {
  type = string
  //  validation {
  //    condition = regexmatch("/^[a-z-]+$/", var.slug)
  //    error_message = "Must be a slug."
  //  }
}

variable "base_url" {
  type = string
  default = "holidesk.co.uk"
}
