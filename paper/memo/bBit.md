```
resemble s t = length (intersection s t) / length (union s t)
```

これの利用例として、重複した web page の発見とか．

しかしながら、intersectionなんかに時間がかかりすぎる．

そのためのよくある手法が、Minwise hashing

```
D = { 1 .. m }
S \subset D
T \subset D
pi :: D -> D -- 置換, bijection
```

Pr [ min(pi(S)) == min(pi(T)) ] = resemble S T

その時に、イコールを見るのに、下bビットだけしかcheckしない．

`b=1`で十分いい．

`b < 1` の場合も考えられる．
例えば、2bitをxorなどで1bitに圧縮して、その1bitを見る？？？？？
いみふ
