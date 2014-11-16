all: memo_ filter_ index_

index_: index.json
	cp index.html.h index.html
	coffee ./bin/index.coffee >> index.html

memo_:
	cd memo; make

filter_:
	cd filter/; make

add:
	bash ./bin/add

edit:
	bash ./bin/edit

ls:
	jq . index.json

git:
	cd ..; make git
