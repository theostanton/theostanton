output "hash" {
  value = data.archive_file.lambda.output_base64sha256
}
