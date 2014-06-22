all: index pres

index:
	### template
	cp index.html.h index.html
	### fortune
	echo "<pre id=fortune>" >> index.html
	./fortune >> index.html
	echo "</pre>" >> index.html
	### ls
	echo "<div id=ls>" >> index.html
	echo `cat ls|grep /|xargs -n1 -i bash -c "echo '<a href={}>{}</a>'"` >> index.html
	echo "</div>" >> index.html

today:
	cd taglibro/; make today
	cd taglibro/; make

# lsしてindexにするだけ
pres: games.pre study.pre template.pre memo.pre dots.pre

%.pre: %
	echo "<pre>" > $^/index.html
	ls -1F $^/ | grep -v index | sed 's/\*//g' | xargs -n1 -i bash -c "echo '<a href={}>{}</a>'" >> $^/index.html

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push

