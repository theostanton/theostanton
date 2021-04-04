variable "lambda" {
  type = object({
    file_path = string
    handler = string
    function_name = string
    role_arn = string
    variables = map(string)
  })
}

variable "api" {
  type = object({
    path = string
    id = string
    root_resource_id = string
    allow_origin = string
  })
}
