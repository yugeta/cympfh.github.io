all : Index push

Index:
	ls -lt > index.html

push :
	git add --all
	git commit -a -m "`kasitime`"
	git push
