all: md2html

md2html:
	for i in *.md; do make $${i%md}html; done

%.html: %.md
	pandoc -s --css memo.css -i $^ -o $@
