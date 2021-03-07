.PHONY: deploy

deploy:
	$(MAKE) -C site build
	$(MAKE) -C deploy apply
