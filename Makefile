all: index

index:
	cp index.html.h index.html
	echo "<pre>" >> index.html
	./fortune >> index.html
	echo "</pre>" >> index.html
	cat index.html.t  >> index.html

git:
	git add --all
	git commit -a -m "`date`"
	git push
