install:
	pnpm install

test:
	pnpm test

build:
	pnpm build

ci:
	pnpm install --frozen-lockfile 
	pnpm test:ci

publish: ci build
	pnpm publish
