all: memo_ cpphtml index.html

index.html: index.html.h main.html
	cat index.html.h main.html > $@

main.html: main.md
	pandoc -i main.md -o main.html

memo_:
	for f in ./memo/*.md; do pandoc -s -t html5 --mathml -i $$f -o $${f%md}html; done

cpphtml:
	for f in ./src/*.cc; do ./bin/cpp2html $$f; done
	rm -f ./src/*.exe

git:
	cd ..; make git
