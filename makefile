install:
	yarn install

test:
	yarn test

build:
	yarn build

ci:
	yarn install --frozen-lockfile 
	yarn test:ci

publish: ci build
	npm publish
