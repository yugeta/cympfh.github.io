index.html: index.md
	pandoc --mathml --css ../css/m.css -t html5 -i $^ -o $@

git:
	git add -A .
	git commit "`date`"
	git push
