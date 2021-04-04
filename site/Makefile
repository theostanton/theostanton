.PHONY: build

build:
	test $(STATS_URL)
	yarn build
	mkdir -p ../deploy/dist/site
	cd out && cp -R . ../../deploy/dist/site
