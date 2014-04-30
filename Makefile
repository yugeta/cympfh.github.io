all: index_ pres git

index_:
	### template
	cp index.html.h index.html
	### fortune
	echo "<div id=fortune>" >> index.html
	echo `fortune` >> index.html
	echo "</div>" >> index.html
	### ls
	echo "<div id=ls>" >> index.html
	echo `ls -1F|grep /|xargs -n1 -i bash -c "echo '<a href={}>{}</a>'"` >> index.html
	echo "</div>" >> index.html

today:
	cd taglibro/; make

# lsしてindexにするだけ
pres: games.pre study.pre latex.pre memo.pre dots.pre

%.pre: %
	echo "<pre>" > $^/index.html
	ls -1F $^/ | grep -v index | xargs -n1 -i bash -c "echo '<a href={}>{}</a>'" >> $^/index.html

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push

