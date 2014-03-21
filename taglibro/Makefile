all: md2html index git

index:
	cp index.html.h index.html
	for year in `seq 2011 2014`; do echo "<div class=c>" >> index.html; ls $${year}/*/*.md | sed 's/.*\.md/<a href=&.html>&<\/a>/g' >> index.html; echo "</div>" >> index.html; done

md2html:
	ls 2014/*/*.md | xargs -n1 -i bash -c "pandoc {} -o {}.html --css ../../css/h1.css"

today:
	vim `date +"%Y/%m/%d.md"`

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push

