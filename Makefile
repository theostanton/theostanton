.PHONY: deploy init build envs deploy_only

init:
	yarn
	yarn transpile
	cd deploy/shared && terraform init && terraform validate
	cd deploy/instance && terraform init && terraform validate
	cd stats/notion/deploy && terraform init && terraform validate

build:
	test $(branch)
	rm -rf deploy/dist
	yarn
	yarn transpile
	$(MAKE) -C stats/lambdas build
	export STATS_URL=https://$(branch)-api.theo.dev && $(MAKE) -C site build

deploy: build
	test $(branch)
	$(MAKE) -C deploy/instance apply branch=$(branch)

deploy_only:
	test $(branch)
	$(MAKE) -C deploy/instance apply branch=$(branch)

envs:
	test $(branch)
	$(shell echo $(MAKE) -C deploy/instance output branch=staging output=envs) > .env

start:
	docker-compose down
	docker build -f docker/Dockerfile -t theostanton:local .
	docker-compose up

stop:
	docker-compose down
