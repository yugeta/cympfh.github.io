all: imitNews index.html

imitNews:
	touch news

index.html: news
	cp index.html.h index.html
	### fortune
	echo "<div class=fortune>" >> $@
	echo `fortune` >> $@
	echo "</div>" >> $@
	### ls
	echo "<div class=ls>" >> $@
	echo `ls -1F|grep /|xargs -n1 -i bash -c "echo '<a href={}>{}</a>'"` >> $@
	echo "</div>" >> $@

git:
	git add --all
	git commit -a -m "`kasitime`"
	git push

clean:
	rm -f index.html
