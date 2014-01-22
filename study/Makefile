all : index

index :
	echo '<pre>' > index.html
	ls -BGgt | sed 's/[^ ]*$$/<a href="&">&<\/a>/' >> index.html
	echo `date` >> index.html
