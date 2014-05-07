all: today md2html index

index:
	cp index.html.h index.html
	ls */*/*.md | runghc script/byYear.hs >> index.html

md2html:
	for i in 201*/*/*.md; do make $${i}.html; done

%.md.html: %.md
	pandoc --mathml -t html5 -s $^ -o $@ --css ../../css/h1.css

today:
	vim `date +"%Y/%m/%d.md"`

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push


