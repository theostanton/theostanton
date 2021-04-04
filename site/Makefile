.PHONY: build

build:
    test $(domain_prefix)
	STATS_URL=https://$(domain_prefix)api.theo.dev yarn build
	mkdir -p ../deploy/dist/site
	cd out && cp -R . ../../deploy/dist/site
