.PHONY: apply invalidate

apply:
	test $(branch)
	terraform workspace select $(branch) || terraform workspace new $(branch)
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
	aws cloudfront create-invalidation --distribution-id $(terraform output distribution_id) --paths /index.html --output table
