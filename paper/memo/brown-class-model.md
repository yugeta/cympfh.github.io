# Class-based n-gram models of natural language

Brown+ら．

[Learning phrase patterns for Text Classification](memo/learning-phrase-patterns.md)
中で、

> 単語のクラスを1次マルコフモデル尤度を最大化することによって自動分類した

とあって引用されていた．

# Introduction

noisy channel 経由で来た、歪んだ英語の文章を元に戻したい．これが第一の議論である．
それに関与することとして、単語にクラスを当てはめることを統計的にしたい．これが第二の議論である．

# 言語モデル

次のような言語モデルを考える．

English text は語の列．

```python
w[1:k]
```
これを、条件付き確率

```python
Pr(w[k] | w[1:k-1])
```
で特徴づける．
文章全体が出来上がる確率はこうだ．

$Pr(w[1:k]) = Pr(w[1]) \cdot Pr(w[2] | w[1:1]) \cdot Pr(w[3] | w[1:2])  \cdots  Pr(w[k] | w[1:k-1])$

<blockquote>
python-like なつもりで書いたけど、

```python
w[i:j]
```
は、列

```tex
{w_i, w_{i+1}, ..., w_j}
```
を表す．
ここで `i <= j` を暗黙的に前提する．
</blockquote>

意味を言えば、`w[1:k-1]`がhistoryであり、`w[k]`がpredictionである．

## n-gram

n-gram language model では、
history の内の最後の `(n-1)` words だけを見る．
それが同じなら同じ history だと見做す．

すなわち

```python
Pr(w[k] | w[1:k-1]) = Pr(w[k] | w[k-n+1 : k-1])
```

とする．ただし `k >= n` と仮定してる．

そうでない場合の確率は特別に扱わなければ．
例えば 2-gram model では、
history には `V (V-1)` 通りある (V = size of vocabulary)．
それと別に `Pr(w[2] | w[1])` が `V - 1` 通りある．

ではそれらの確率をどっからもってくるか．
training text における最尤推定、すなわち、
数えて割合を出すことをする．

`C(w)` は training text における `w` の頻度数．

$Pr(w[n] | w[1:n-1]) = \dfrac{C(w[1:n-1] w[n])}{\sum_w C([1:n-1] w)}$

ここで、`w[1:n-1] w` は、列の末尾にword を一つ追加した新しい列を意味する．

## interpolated estimation (Jelinek and Mercer, 1980)

vocabulary は大きければ良い．
しかしながら、n-gram の `n` が増えるにしたがって、指数的に、頻度は減っていく．
単純に、`n`は大きいほうがモデルの精度としては上がるけれど、
固定された語彙に対しては、信頼性が減っていく．

interpolated estimation と呼ばれるものは、
いくつかの言語モデル $Pr^{(j)}$ を構築して、それらをcombineすることで、$Pr'$ を得る．

$$Pr'(w[i] | w[1:i-1]) = \sum_j \lambda_j(w[1:i-1]) Pr^{(j)}(w[i] | w[1:i-1])$$

重み $\lambda_j$ は EMアルゴリズムで作る．

# Word Classes

意味的にか、構造的にか、ある語とある語が似ているということがある．
`(Thursday, Friday)`
とかね．

vocabulary `V`, classes `C` があって、語 `w` をclass `c` に写す写像を `pi` とする．

```python
pi(w) = c
```

## n-gram class model

写像 `pi` が既に与えられた上で、クラスを用いた n-gram model を次のように定める．

```python
Pr(w[k] | w[1:k-1]) = Pr(w[k] | c[k]) Pr(c[k] | c[1:k-1])
```

ここで、n-gram とする以上、

```python
Pr(c[k] | c[1:k-1]) = Pr(c[k] | c[k-n+1 : k-1])
```
とする．

training text から、右辺の2つの確率を最尤推定する．

まず、簡単な 1-gram の場合は、

```python
Pr(w | c) = C(w) / C(c)
Pr(c) = C(c) / T
```

ここで、`T` は、training text 中の word 数である．
training text は、 `t[1:T]` と書けて、
`C(c)`は、`length(map(pi, t))` である．

2-gramなら、
$Pr(c[2] | c[1]) = \dfrac{C(c[1]c[2])}{\sum_c C(c[1] c)}$
となる．

## 尤度

$L(pi) = (T - 1)^{-1} \log Pr(t[2:T] | t[1])$

これを尤度とする．2-gram model の下でこれを式変形すると、

$L(pi) = \sum_{w1, w2} \dfrac{C(w1 w2)}{T-1} \log Pr(c2 | c1) Pr(w2 | c2)$

さらにうわぁーってやると、

$L(pi) = -H(w) + I(c1, c2)$
ここで、`H`はエントロピー、`I`は相互情報量．
`w` は training text から降ってくるから、

`L(pi)`を最大化するような`pi`を選択する、というのは、
相互情報量を最大化するようなクラス分類を選択することになる．







