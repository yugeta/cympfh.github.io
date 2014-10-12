imagelist: js/list
	echo "list = [" > js/list.js
	cat js/list | sed 's/^.*$$/  "&",/' >> js/list.js
	echo "]" >> js/list.js

js/list:
	ls -1 img/ > js/list
