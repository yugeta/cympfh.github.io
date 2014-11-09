all: cpphtml index.html

index.html: index.html.h main.html
	cat index.html.h main.html > $@

main.html: main.md
	pandoc -i main.md -o main.html

cpphtml:
	for f in ./src/*.cpp; do ./bin/cpp2html $$f; done

git:
	cd ..; make git
