.PHONY: build

build:
	STATS_URL=http://localhost:3000 yarn build
	mkdir -p ../deploy/dist/site
	cd out && cp -R . ../../deploy/dist/site
