JavaScript の変数スコープ

nodeがこのPCに入ってなかったのでSpiderMonkeyで動作を確認する

# 変数宣言に2種類あり、

```
js> var x = 2 
js> x
2
js> y = 2
2
```

`var` による変数宣言がいかにも宣言しており、

```
js> var x
```

この時、`x` には `undefined` という値が入っていることが期待される。

```
js> x == undefined
true
```

初期値を伴うことができる。

```
js> var y = 1
```

あるいは、`var` を使わず、突然変数に値を代入する形で宣言する
こともできる。
```
js> z   
typein:4: ReferenceError: z is not defined
js> z = 2
2
js> z
2
```

このような違いがある。
```
js> delete x
false
js> delete y
true
js> x
2
js> y
typein:7: ReferenceError: y is not defined
```

# トップレベルでの変数宣言はグローバル変数になる。
グローバルであるとはつまり、どこからでも参照しうるということ。

```
js> z = 1
1
js> (function(){return z})() 
1
```

グローバル変数に `var` を付けるのは馬鹿らしい。
初期値を指定しないけれど、とりあえず変数宣言したい、ってのは
あんまり必要ない。それなら、
```
js> x = undefined
```
とか
```
js> x = null
```
なんかでいい。その値を使わない、というならば、変数宣言が
なされるまでその変数は使われないということである。そのタイミング
でグローバル変数を宣言すればよい。

# 関数の中でもグローバル変数は宣言できる。

```
js> t
typein:7: ReferenceError: t is not defined
js> (function(){t=3})();
js> t
3
```

`var` を使わない変数宣言とは、さもトップレベルという何かオブジェクト
にプロパティを追加しているようである。

`var` による変数宣言は、その関数の中でローカルである。

```
js> u
typein:10: ReferenceError: u is not defined
js> (function() {var u=3})();
js> u
typein:13: ReferenceError: u is not defined
```

こうなる。

`var` のローカル性は、
`function(){...}` という括りの内外しか境界しない。
例えば `for` 文について、それは注意が必要となる。

```
js> u
typein:14: ReferenceError: u is not defined
js> for(var u=0; u<10; ++u);
js> u
10
```
これは、グローバル変数の `u` を宣言したことになる。

複数の関数の中の `for` で使ってるイテレータ(あるいはインデクサ) としての
変数 `i`, `j` が衝突することがよくある。
javascriptは全然、初心者が使える言語ではない。
その環境の整えやすさ(ネットブラウザで動かす)
からよく初めての人への言語とされることがあるけれど。

# let束縛。

関数にとって、引数という変数は `var` で宣言したローカルしたものと同一視できる。
```
function (x, y ...) {
    [x, y ...]
}
```
は次に同じ
```
function (x, y ...) {
    var a = x, b = y ...
    [a, b ...]
}
```
引数に値を渡して、関数本体が引数をローカル変数として使うことを、let束縛という。
```
(function (x,y) {
    ...
})(1,2)
```
を、
```
let x = 1
    y = 2 in
    ...
```
のように書く言語がある。javascript1.8以降なら、こんな構文がサポートされてる。
```
let (x=1) {
    let (y=2) {
        ...
    }
}
```

## 追記 (2014年 9月 9日 火曜日 12時14分22秒 JST)

"javascript 1.8" とか 気にせずに
"ECMA Script" の最新版を追うことをしたほうがいい。

ref:
[let - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/let)

### let宣言

`var` キーワードの代わりに `let` キーワードを用いる。
最も内側のブロックをスコープにしてくれる。

```javascript
if (true) {
  let x = 3;
}
```

### let式・文

中に式を書けば式になるし、文を書けば文になる。

```javascript
let (x = 3) {
  proc(x);
}
```

```javascript
var x = 0;
proc(let(x = 1) x); // 1 is passed
```

# ローカル変数の境界はfunction(){}の内外でしかないということ。
例えば、C/C++は あらゆる {} をブロックとして、その内外にスコープを与える。
```
for (var i...) {
}
```
と合った時、その変数 i は、ぎりぎりブロックの内にあり、外には影響しない。

```
js> (function (s) { for(var s=0;s<10;++s); return s})(3)
10
```

こんなコードをたとえスコープがどうあれ、コードは人間が読む為のものなので
混乱させるようなコードを書くべきでないのだが、returnするsは、引数のsで
あってほしいのだけれど、forのvar sは関数の中でスコープの対象なので、
そちらに破壊的に代入を行ってることになる。

# 静的スコープ

参照される変数は、コードさえ読めば、今後どう使われようとも一つに決まる
ということ。

```
js> f = function(){return x}
function () {
    return x;
}
```

fは、トップレベルで定義されたから、トップレベルにあるx、つまりグローバル変数
としての x しか参照しない。

```
js> x = 0
0
js> f()
0
js> x = 1
1
js> f()
1
js> (function(x){ return f() })(4)
1
js> (function() { var x = 4; return f() })()
1
```

身近にローカル変数 x があっても、fは定義した時の x を参照する。
大抵の言語はこうである。

# lambda への let束縛

その無名関数からしか見ることのできない変数スコープを与える。javascriptにおいて
与えられるスコープとは、関数という単位のみにおいてである。

まず外側で let x = 100 とした上で、xを参照するだけの関数を評価する。

```
js> lambda = (function(x){ return (function(){ return x }) })(100)
function () {
    return x;
}
js> x       
1
js> lambda()
100
```

100という値の入ったxは、もはやlambdaからしか見れない。lambda にとっては、
x = 100 はすぐそこにある変数だ。

javascriptには必ずある素晴らしい関数 eval を用いて、lambda を次のように再定義
しよう。

```
js> lambda = (function(x){ return (function(s){ return eval(s) }) })(100)
function (s) {
    return eval(s);
}
```

このように使う。
```
js> lambda("x")
100
js> lambda("x = 9")  
9
js> lambda("x")     
9
js> x
1
```

lambdaにだけ、別のxが見えている。

# OOP
どうしたら、それはオブジェクトであるって認めてくれる？
私が思うに、一つの変数でしかグローバルを汚さず、その変数に複数のプロパティ
をもたせ、それぞれにゲッターとセッターという機能を持たせれば、それはもう
オブジェクトだよね。

x, y という2つのプロパティだけを持つオブジェクト。

```
js> point = function(x, y) {
    return function (g) {
              return g(x, y);
    } 
}
function (x, y) {
    return function (g) {return g(x, y);};
}

// これってまんまconsの定義なんだよなぁ…

js> p = point(0, 0)
function (g) {
    return g(x, y);
}
js> p(function(){return x}) // get x of p
1
js> p(function(){return y=3}) // set y of p
3
js> p(function(){return y})   // get y of p
3
```

ゲッターとセッターを取り出して使いやすくしよう。
実際にはそういうシンタックスシュガーなのだろう。

```
js> x_of = function(p){return p(function(){return x})}
function (p) {
    return p(function () {return x;});
}
js> y_of = function(p){return p(function(){return y})} 
function (p) {
    return p(function () {return y;});
}
js> x_set = function(p, m){return p(function(){return x=m})}
function (p, m) {
    return p(function () {return x = m;});
}
js> y_set = function(p, m){return p(function(){return y=m})} 
function (p, m) {
    return p(function () {return y = m;});
}
```

こう使う.
```
js> x_of(p)
1
js> y_of(p)
3
js> x_set(p, 100)
100
js> x_of(p)
100
```

# カウンター
Schemeの教科書でよくある例。
わたしはこいつがとても好きなのだ。

```
js> generator = function() {
var cx = 0; 
return function(){ return cx++; }
}
function () {
    var cx = 0;
    return function () {return cx++;};
}
js> counter = generator()
function () {
    return cx++;
}
js> counter()
0
js> counter()
1
js> counter()
2
js> counter2 = generator()
function () {
    return cx++;
}
js> counter2()
0
js> counter2() // 当然だけど、counterのcxとcounter2のcxはそれぞれ独立。
1
js> counter()              
3
js> cx
typein:77: ReferenceError: cx is not defined // もちろん、グローバルを汚してない。
```

