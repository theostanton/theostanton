.PHONY: apply invalidate

apply:
	terraform apply -auto-approve

invalidate:
	$(eval DISTRIBUTION_ID=$(shell  terraform output distribution_id))
	@echo $(DISTRIBUTION_ID)
	aws cloudfront create-invalidation --distribution-id $(DISTRIBUTION_ID) --paths /index.html --output table
