all: index pres

index:
	cp index.html.h index.html
	echo "<pre>" >> index.html
	./fortune >> index.html
	echo "</pre>" >> index.html

# lsしてindexにするだけ
pres: template.pre

%.pre: % 
	> $^/index.html
	echo '<link rel="stylesheet" type="text/css" href="../css/b.css">' >> $^/index.html
	echo "<h2>$(shell ./capitalize $^)/</h2>" >> $^/index.html
	echo "<pre>" >> $^/index.html
	ls -1tF $^/ | grep -v index | sed 's/\*//g' | xargs -n1 -i bash -c "echo '<a href={}>{}</a>'" >> $^/index.html

git:
	git add --all
	tw-cd cympfh
	git commit -a -m "`date`"
	git push 2>&1 | tee /tmp/result
	tail -1 /tmp/result | $$HOME/bin/tw
