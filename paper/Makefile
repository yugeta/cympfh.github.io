all: memo_ index_

index_: index.json
	cp index.html.h index.html
	coffee ./bin/index.coffee >> index.html

memo_:
	cd memo; make

git:
	cd ..; make git
