.PHONY: apply destroy

apply:
	test $(slug)
	terraform workspace select $(slug) || terraform workspace new $(slug)
	terraform apply -auto-approve -var="slug=$(slug)"

destroy:
	test $(slug)
	terraform workspace select $(slug)
	terraform destroy -auto-approve -var="slug=$(slug)"
