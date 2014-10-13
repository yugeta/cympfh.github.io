all: memos index.html

memos:
	cd memo; make

index.html: keywords.js index.md
	cat index.md footer > /tmp/out.md
	pandoc -t html5 -s --css paper.css -i /tmp/out.md -o index.html

keywords.js: keywords
	> $@
	echo "keywords = [" >> $@
	cat keywords | sed 's/^:\(.*\)$$/\"\1\",/' >> $@
	echo "]" >> $@

git:
	cd ..; make git

clean:
	rm index.html keywords.js
