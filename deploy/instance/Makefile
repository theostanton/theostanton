.PHONY: apply invalidate

apply:
	terraform init
	terraform validate
	test $(branch)
	terraform workspace select $(branch) || terraform workspace new $(branch)
	terraform init
	terraform apply -auto-approve -var="branch=$(branch)"

destroy:
	test $(branch)
	terraform workspace select $(branch)
	terraform destroy -auto-approve -var="branch=$(branch)"
	terraform workspace select default
	terraform workspace delete $(branch)

invalidate:
	export distribution_id=$(terraform output distribution_id)
	echo distribution_id
	aws cloudfront create-invalidation --distribution-id E3IY8ZD12T6HMB --paths "/**" --output table

spinup:
	psql $(shell terraform output database_url) -f ./database.schema.sql

output:
	@test $(branch)
	@test $(output)
	@terraform workspace select $(branch)
	@terraform output -json | jq -r .$(output).value
