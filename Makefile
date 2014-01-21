all : index push

index:
	echo '<textplain>' > index.html
	find . | egrep --color=never '.html|.txt|.md' | sed 's/^.*$$/<a href="&">&<\/a>/' >> index.html

push :
	git add --all
	git commit -a
	git push
