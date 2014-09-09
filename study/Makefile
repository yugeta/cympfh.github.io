all: md2html

md2html:
	for i in *.md; do make $${i%md}html; done

%.html: %.md
	pandoc -s --css ../css/m.css -i $^ -o $@
