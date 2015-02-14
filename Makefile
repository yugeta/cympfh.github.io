all: index pres

index:
	cp index.html.h index.html
	echo "<pre>" >> index.html
	./fortune >> index.html
	echo "</pre>" >> index.html
	cat index.html.t  >> index.html

# lsしてindexにするだけ
pres: template.pre

%.pre: % 
	> $^/index.html
	echo '<link rel="stylesheet" type="text/css" href="../css/b.css">' >> $^/index.html
	echo "<h2>$(shell ./capitalize $^)/</h2>" >> $^/index.html
	echo "<pre>" >> $^/index.html
	ls -1 $^/ | grep -v index | sed 's/\*//g' | xargs -n1 -i bash -c "echo '<a href={}>{}</a>'" >> $^/index.html

git:
	git add --all
	git commit -a -m "`date`"
	git push
