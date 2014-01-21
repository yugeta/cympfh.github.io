all : push

push :
	git add --all
	git commit -a
	git push
