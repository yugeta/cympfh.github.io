all: md2html index sum

index:
	sed "s/MD5/$$(git log | head -1 | cut -d' ' -f2)/" index.html.h > index.html
	echo "<a class='article else' href=summary/index.html?$$(./script/rand)>summary</a>" >> index.html
	ls */*/*.md | sort -r | coffee script/color.coffee >> index.html

md2html:
	for i in 2014/*/*.md; do make $${i}.html; done

%.md.html: %.md
	pandoc --mathml -t html5 -i $^ -o $@ --css ../../css/h1.css

sum:
	cd summary/; make

today:
	./script/vimtoday

open: md2html index
	firefox ./index.html

git:
	cd ..; make git

