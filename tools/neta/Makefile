all: imagelist ngram_

imagelist:
	ls -1 img/ > js/list
	echo "list = [" > js/list.js
	cat js/list | sed 's/^.*$$/  "&",/' >> js/list.js
	echo "]" >> js/list.js

ngram_:
	ls -1 desc > /tmp/desc_list
	./tool/ngram /tmp/desc_list ./ngram/datum.js

# 最初の一回だけ
init:
	for u in `cat undesc_list`; do ./tool/search_description http://cympfh.github.io/tools/neta/img/$$u >> desc/$${u}.txt; sleep 30; done
