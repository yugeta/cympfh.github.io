git:
	git add --all
	git commit -a -m "`kasitime`"
	git push


index:
	echo '<pre>' > index.html
	ls -hBGgt | sed 's/[^ ]*$$/<a href="&">&<\/a>/' >> index.html
	echo `date` >> index.html

