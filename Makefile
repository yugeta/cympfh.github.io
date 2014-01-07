all : index.html push

index.html:
	ls -lt > $@

push :
	git add --all
	git commit -a -m "`kasitime`"
	git push
