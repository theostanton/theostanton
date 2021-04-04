ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: deploy

build:
	rm -rf deploy/dist
	yarn
	yarn transpile
	$(MAKE) -C stats/lambdas build
	$(MAKE) -C site build

deploy: build
	test $(branch)
	$(MAKE) -C deploy/instance apply branch=$(branch)

envs:
	test $(branch)
	$(shell echo $(MAKE) -C deploy output branch=feature-stats output=envs) > .env
