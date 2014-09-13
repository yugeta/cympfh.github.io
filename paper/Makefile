all: memos index.html

memos:
	cd memo; make

index.html: keywords.js index.md
	cat index.md footer > /tmp/out.md
	pandoc -s --css paper.css -i /tmp/out.md -o index.html

keywords.js: keywords
	> $@
	echo "keywords = [" >> $@
	cat keywords | sed 's/^:\(.*\)$$/\"\1\",/' >> $@
	echo "]" >> $@

git:
	git add --all .
	git commit -m "`date`"
	git push

clean:
	rm index.html keywords.js
