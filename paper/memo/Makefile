md2html:
	for i in *.md; do make $${i%md}html; done

%.html: %.md
	pandoc --css ../../css/m.css -s -i $^ -o $@
