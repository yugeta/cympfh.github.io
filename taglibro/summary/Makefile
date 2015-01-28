all: index

index: newest random images
	cp index.html.h index.html
	coffee gen.coffee images.txt newest.txt random.txt >> index.html

light:
	cp index.html.h index.html
	coffee gen.coffee images.txt newest.txt random.txt >> index.html

newest:
	ls -1t ../*/*/*.md | sort -r > newest.txt

random:
	for md in ../*/*/*.md; do echo "$${RANDOM} $${md}"; done | sort -R | cut -d' ' -f2 > random.txt

# get 12 random
images:
	for i in `seq 1 12`; do curl -s http://www.lgtm.in/g | grep 'id="imageUrl"' | cut -d '"' -f4; done > images.txt
