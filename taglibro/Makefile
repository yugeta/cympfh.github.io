do:
	cat Makefile

index:
	cp index.html.h index.html
	ls */*/*.md | sort -r | coffee script/color.coffee >> index.html

md2html:
	for i in 201*/*/*.md; do make $${i}.html; done

%.md.html: %.md
	pandoc --mathml -t html5 -i $^ -o $@ --css ../../css/h1.css

test:
	pandoc --mathml -t html5 -s -i 2014/05/04.md -o 2014/05/04.test.html --css ../../css/h1.css

today:
	./script/vimtoday
	make md2html
	make index

open: md2html index
	firefox ./index.html

git:
	git add --all
	git commit -a -m "`date`"
	git push


