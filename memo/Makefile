all: mplayer.html dot.html

%.html: %.md
	pandoc -s -i $^ -o $@
