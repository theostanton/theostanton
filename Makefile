.PHONY: deploy

#bump

deploy:
	$(MAKE) -C site build
	$(MAKE) -C deploy apply

invalidate:
	#cd deploy && distribution_id=`$(terraform output distribution_id)`
	distribution_id=123
	echo $(distribution_id)
	cd deploy && aws cloudfront create-invalidation --distribution-id $(distribution_id) --paths /index.html
