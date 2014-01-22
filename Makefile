all : index push

index:
	echo '<pre>' > index.html
	ls -BGgt | sed 's/[^ ]*$$/<a href="&">&<\/a>/' >> index.html
	echo `date` >> index.html

push :
	git add --all
	git commit -a -m "`kasitime`"
	git push
