all: md2html index

index:
	echo "<a href=http://is.gd/mC4zzr>http://is.gd/mC4zzr</a>"
	echo "<pre>" > index.html
	ls */*/*.md | sed 's/.*\.md/<a href=&.html>&<\/a>/g' >> index.html

md2html:
	ls 2014/*/*.md | xargs -n1 -i bash -c "pandoc {} -o {}.html --css ../../css/h1.css"

today:
	vim `date +"%Y/%m/%d.md"`

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push
