# Using Maximum Entropy for Text Classification

1999年の論文。
なんか線形SVMっぽい??

## 最大エントロピーによるテキスト分類の直感的な知見。

class A,B,C,D という4つに、文書が振り分けられているときに、
次の命題があるとする。

> "professor" という単語を含む文書の40% が class A であった

ここから次のように確率を推定するのは自然。

- professor を含む文書は、40%の確率で class A. 各々20%の確率で、class B,C,D.

加えて、

- professor を含まない文書は、25%ずつの確率で、class A..D

## model

### Maximum entropy

- d: document
- c: class

について、素性 $f_i(d, c)$ を考える。
これは、実関数ならなんでもよい。
具体的な$f_i$としては、
例えば、ある単語 `w` を含むカウントとか。

コーパス `D` が与えられているとする。
コーパス `D` は、文章 `d` の集合であり、
既に、`d` の class `c = c(d)` も与えられている。

さて、これについて、
素性 $f_i$ の平均はいかになるか。

1.
$$\dfrac{1}{|D|} \sum_{d \in D} f_i(d, c(d))$$

仮に分布 `P(d)`, `P(c|d)` が与えられてれば、

ある `d` についての `f_i` の期待値は、
$$\sum_c P(c|d) f_i(d, c)$$
と書けて、
コーパス `D` についての期待値は、

2.
$$\sum_{d \in D} P(d) \sum_c P(c|d) f_i(d, c)$$
と表せる。

(1.)と(2.)が等しいことを、最大エントロピー法は仮定する。

$$P(d) = 1 / |D|$$
としてしまえば、

$$\sum_{d \in D} f_i(d, c(d)) = \sum_{d \in D} \sum_c P(c|d) f_i(d, c)$$

さて、Della Pietra+, 1997 によれば、最大エントロピーに従う確率分布は、exp の形に書ける。
今の場合、
素性を列
$$[ f_1, f_2, \dots, f_n ]$$
として、
これらに対応する重み
$$\Lambda = [ \lambda_1, \lambda_2, \dots, \lambda_n ] $$
が存在して、次のように、

$$P(c|d) = \frac{1}{Z(d)} \exp \left[ \sum_i \lambda_i f_i(d, c) \right]$$

これを使えば、対数尤度は、

$$\ell(\Lambda, D) = \log \prod_{d \in D} P_\Lambda(c(d) | d)$$

### Improved Iterative Scaling (IIS)

先ほどの、
$$\ell(\Lambda, D) = \log \prod_{d \in D} P_\Lambda(c(d) | d)$$
を大きくするように、$\Lambda$を調整する。
山登り法でこれを行う。

まず、$$\frac{\partial^2}{\partial \lambda_i^2} \ell$$ をやってみると、
上に凸になる。
よって、山登りでOK.

$$\Lambda \rightarrow \Lambda + \Delta
where \Delta = [ \delta_1 ... \delta_n ]$$
という山登りを考える。

$$\ell(\Lambda + \Delta | D) - \ell(\Lambda | D)
= \sum_d \sum_i \delta_i f_i - \sum_d \left[
\log \sum_c \exp \sum_i \left[ (\lambda_i + \delta_i) f_i \right]
- \log \sum_c \exp \left[ \sum_i \lambda_i f_i \right] \right]$$

$$it = \sum_d \sum_i \delta_i f_i
- \sum_d \log \dfrac{\sum_c \exp \sum (\lambda + \delta) f}{\sum_c \exp \sum_i \lambda f}$$

This derived as follows because Jensen's ineq.

$$it \ge \sum_d \sum_i \delta_i f_i
- \log \sum_d \dfrac{\sum_c \exp \sum (\lambda + \delta) f}{\sum_c \exp \sum_i \lambda f}$$

And, note that `- log x >= 1 - x`

$$it \ge 1 + \sum_d \sum_i \delta_i f_i
- \sum_d \dfrac{\sum_c \exp \sum (\lambda + \delta) f}{\sum_c \exp \sum_i \lambda f} = B$$

This `B` is a function of `Lambda`.

もうちょっと式を綺麗にすると、

$$B = 1 + \sum_d \sum_i \delta_i f_i
- \sum_d \dfrac{\sum_c \exp \sum (\lambda + \delta) f}{Z(d)}$$

$$f^\# = f^\#(d, c) = \sum_i f_i(d, c)$$ を使えば、

$$B = 1 + \sum_d \sum_i \delta_i f_i
- \sum_d \dfrac{\sum_c \exp \left[ \sum_i \lambda_i f_i \right] \cdot \exp \left[ \sum_i \delta_i f_i \right]}{Z(d)}$$

$$B = 1 + \sum_d \sum_i \delta_i f_i
- \sum_d \sum_c
P_\Lambda(c|d) \exp \left[
f^\#(d, c) \sum_i \frac{\delta_i f_i(d,c)}{f^\#(d,c)}
\right]$$

> ここ、論文の式は誤りと思われる。

これを大きくしたい。
次の偏微分を考える。

$$\frac{\partial B}{\partial \delta_i} = 
\sum_d \left[
f_i(d, c(d)) -
\sum_c P_\Lambda(c|d) f_i(d,c) \exp \left[ \delta_i f^\#(d,c) \right]
\right]$$

これが 0 となるような、`delta` を Newton's なんかで解く。
凸性から、解があることは分かっている。

```coffee
for i in I
  lambda[i] = 0

until converge # or step
  for i in I
    solve the partial equation of delta[i]
    lambda[i] += delta[i]
```

### Gaussian Prior (事前分布?)

訓練データが少ないとき、
先の $\lambda_i$
なんかは、実際のものよりも、かけ離れるものと思われる。
ある程度の誤差を許すようにする。
そこでガウス分布を用いる。
列 Lambda 自体の確率を次のように。

$$P(\Lambda) = \prod_i \frac{1}{\sqrt{2 \pi \sigma_i^2}} \exp \left[ \frac{- \lambda_i^2}{2 \sigma_i^2} \right]$$

尤度には、これをかけ算すれば良い。
対数とって、偏微分すると、結局、次の1項を足し算すればいい。

$$\frac{\lambda_i+\delta_i}{-\sigma_i^2}$$

## features for Text Classification

for a word `w` and class `k`

```haskell
f_i d c
  | c == k    = N (d, w) / N d
  | otherwise = 0
  where
    N (d, w) = count the words w in document d
    N d = count any words in document d
```

## Experiment

- Naiive Bayse (comparison)
- Maximum Entropy (w/o Gaussian Prior)
- Maximum Entropy (w/ Gaussian Prior)

場合にもよるけど、良いときは良い。
悪くはない。

