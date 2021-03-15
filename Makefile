.PHONY: deploy

deploy:
	test $(branch)
	$(MAKE) -C site build
	$(MAKE) -C deploy apply branch=$(branch)
