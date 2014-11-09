all: cpphtml index.html test

index.html: index.html.h main.html
	cat index.html.h main.html > $@

main.html: main.md
	pandoc -i main.md -o main.html

cpphtml:
	for f in ./src/*.cpp; do ./bin/cpp2html $$f; done

test:
	pandoc -t html5 -i src/test.md -o src/test.html

git:
	cd ..; make git
