.PHONY: deploy

spinup:
	terraform -chdir=deploy init -upgrade
	terraform -chdir=deploy apply  -auto-approve

run_tests:
	jest

destroy:
	terraform -chdir=deploy destroy  -auto-approve


test:
	make spinup
	-make run_tests
	make destroy
