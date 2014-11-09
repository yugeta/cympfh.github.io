テスト環境
---

- ソースコード: `main.cc`
- コンパイラ: `g++`
- クリップボード操作: `xsel`

```make
all: main.exe input_
	./main.exe < input | tee out

main.exe: main.cc
	g++ -o $@ -std=c++11 $^

input_:
	xsel -bo | sed -e 's/^\s*//g' | sed -e 's/\s*$$//g' > input

test: main.exe
	@for i in cases/*.in; do \
		./main.exe < $$i > /tmp/out; \
		cmp -s /tmp/out $${i%in}out; \
		RETVAL=$$?; \
		if [  $$RETVAL -eq 1 ]; then \
		/bin/echo -e '\e[31m'$$i'\e[m'; \
		diff /tmp/out $${i%in}out; \
		exit 1; \
		fi; \
		done; \
		/bin/echo -e '\e[34mall passed!\e[m'

clean:
	-rm -f out *.exe cases/* /tmp/out
	mv main.cc main.cc.bk
	cp ~/git/cympfh.github.io/c++/src/template.cpp main.cc
```

usage
---

- 簡単な場合

一つの入力をクリップボードにコピー

```
$ make
```

出力は `out` に保存されるのと同時に標準出力される。  
目視することが前提。

- 難しい場合

複数の入力ケースと出力ケースを自分で用意する。
`cases/` ディレクトリ以下に、
入力ケース `X.in` と、それに対して `X.out` を置いておく。
出力の検査は `diff` で行う。

```
$ mkdir cases
$ echo 2 > cases/1.in
$ echo prime > cases/1.out
$ echo 3 > cases/2.in
$ echo prime > cases/2.out
$ echo 4 > cases/3.in
$ echo composed number > cases/3.out
$ make test
```

通れば `all passed!`が表示される。

note
---

入力をコピペでやると、たいてい、
不要な空行とか空白文字が入る。
私は、C++のcinを使うので、
問題ないが、たまに困るかもしれない。

`make test` による検査は単に diff をするから、
ある誤差を許す浮動小数点の出力でちょっとアレかもしんない。
