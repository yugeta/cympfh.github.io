all : index push

index:
	echo '<pre>' > index.html
	find . | egrep --color=never '.html|.txt|.md' | sed 's/^.*$$/<a href="&">&<\/a>/' >> index.html
	echo `date` >> index.html

push :
	git add --all
	git commit -a
	git push
