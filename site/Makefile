.PHONY: build

build:
	STATS_URL=https://api.theo.dev yarn build
	mkdir -p ../deploy/dist/site
	cd out && cp -R . ../../deploy/dist/site
