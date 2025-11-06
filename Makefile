build:
	rm -rf .dist
	nue build
	cd .dist && zip -r ../dist.zip .