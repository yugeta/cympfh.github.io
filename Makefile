all: index_ taglibro_ games_

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

games_:
	echo `ls -1F games/* |xargs -n1 -i bash -c "echo '<a href={}>{}</a>'"` >> games/index.html

taglibro_:
	cd taglibro/; make

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push

