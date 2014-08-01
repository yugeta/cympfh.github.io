test: index
all: index pres

index:
	cp index.html.h index.html
	echo "<pre>" >> index.html
	./fortune >> index.html
	echo "</pre>" >> index.html

today:
	cd taglibro/; make today
	cd taglibro/; make

# lsしてindexにするだけ
pres: study.pre template.pre memo.pre dots.pre

%.pre: %
	echo "<h3>$(shell ./capitalize $^)/<h3>" > $^/index.html
	echo "<pre>" >> $^/index.html
	ls -1F $^/ | grep -v index | sed 's/\*//g' | xargs -n1 -i bash -c "echo '<a href={}>{}</a>'" >> $^/index.html

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push

