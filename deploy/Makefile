.PHONY: apply invalidate

apply:
	test $(branch)
	terraform workspace select $(branch) || terraform workspace new $(branch)
	terraform apply -auto-approve -var="branch=$(branch)"

destroy:
	test $(slug)
	terraform workspace select $(slug)
	terraform destroy -auto-approve -var="slug=$(slug)"
	terraform workspace select default
	terraform workspace delete $(slug)

invalidate:
	test $(distribution_id)
	aws cloudfront create-invalidation --distribution-id $(distribution_id) --paths /index.html --output table
