all : Index push

Index:
	echo "<plaintext>" > index.html
	ls -lt >> index.html

push :
	git add --all
	git commit -a -m "`kasitime`"
	git push
