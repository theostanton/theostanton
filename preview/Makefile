.PHONY: apply destroy

apply:
	test $(slug)
	terraform workspace select $(slug) || terraform workspace new $(slug)
	terraform import -var="slug=$(slug)" aws_route53_zone.main Z03172511UTGZBVKR1YPP || true
	terraform apply -auto-approve -var="slug=$(slug)"

destroy:
	test $(slug)
	terraform workspace select $(slug)
	terraform destroy -auto-approve -var="slug=$(slug)"
