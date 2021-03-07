env:
	yarn global add yalc nodemon

push:
	yarn build
	yalc push

watch:
	nodemon --ignore es/ --ignore types/ --ignore node_modules/ --watch components -C -e ts,tsx --debug -x "make push"