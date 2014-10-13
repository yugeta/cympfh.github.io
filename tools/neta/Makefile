all: index imagelist ngram_

index:
	sed "s/MD5/$$(git log | head -1 | cut -d' ' -f2)/" index.html.template > index.html

imagelist:
	ls -1 img/ > js/list
	echo "list = [" > js/list.js
	cat js/list | sed 's/^.*$$/  "&",/' >> js/list.js
	echo "]" >> js/list.js

ngram_:
	ls -1 desc > /tmp/desc_list
	./tool/ngram /tmp/desc_list ./ngram/ngram.json
	./tool/tfidf ../ngram/ngram.json ./ngram/datum.js

git:
	git add -A .
	git commit -m "`date`"
	git push
