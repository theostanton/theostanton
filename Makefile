ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: deploy

deploy:
	test $(branch)
	# $(MAKE) -C site build
	$(MAKE) -C stats build
	$(MAKE) -C deploy apply branch=$(branch)

envs:
	test $(branch)
	$(shell echo $(MAKE) -C deploy output branch=feature-stats output=envs) > .env

generate:
	test $(DATABASE_URL)
	yarn workspace @theostanton/model generate -c $(DATABASE_URL)
