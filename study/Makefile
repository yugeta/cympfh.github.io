all: index.html

%.html: %.md
	pandoc -s -t html5 --css ../css/m.css -i $^ -o $@

git:
	cd ..; make git
