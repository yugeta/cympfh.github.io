- beamer.pdf: beamer.tex

- gcc cpp.txt

- ghc haskell.hs.txt

- javascript.js.txt

ヘッダとして

- pandoc-beamer.pdf: pandoc-beamer.md

```make
	pandoc -s -t beamer -V theme:Antibes -V colortheme:beaver test.md -o test.tex
	platex test.tex
	dvipdfmx test
	zathura test.pdf &
```

pandocの作るtexはそのままはコンパイルできないイメージあったけど
何故か出来た．
