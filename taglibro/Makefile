all: md2html index sum

index:
	cp index.html.h index.html
	ls */*/*.md | sort -r | coffee script/color.coffee >> index.html

md2html:
	for i in 201*/*/*.md; do make $${i}.html; done

%.md.html: %.md
	pandoc --mathml -t html5 -i $^ -o $@ --css ../../css/h1.css

sum:
	cd summary/; make

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


