all: md2html index

index:
	cp index.html.h index.html
	ls */*/*.md | runghc script/byYear.hs >> index.html

md2html:
	for m in `seq -f "02g" 4 12`; do ls 2014/$${m}/*.md | xargs -n1 -i bash -c "pandoc --mathml -t html5 -s {} -o {}.html --css ../../css/h1.css"; done

%.md.html: %.md
	pandoc -t html5 -s $^ -o $@ --css ../../css/h1.css

today:
	vim `date +"%Y/%m/%d.md"`

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push


