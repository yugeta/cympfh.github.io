all: index

index: newest random images
	cp index.html.h index.html
	coffee gen.coffee images.txt newest.txt random.txt >> index.html

newest:
	ls -1t ../*/*/*.md | sort -r > newest.txt

random:
	for md in ../*/*/*.md; do echo "$${RANDOM} $${md}"; done | sort -n | cut -d' ' -f2 > random.txt

images:
	curl http://www.lgtm.in/ | grep -e '<img .* src="htt' | sed 's/^.*src="//g' | sed 's/".*$$//g' | grep -v akamai | grep -v amazon > images.txt
