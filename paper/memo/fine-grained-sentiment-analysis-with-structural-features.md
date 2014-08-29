# Fine-Grained Sentiment Analysis with Structural Features

:url http://aclweb.org/anthology/I/I11/I11-1038.pdf)

# Authors

†KR & KM Research Group
University of Mannheim
Mannheim, Germany

‡Heidelberg Institute for
Theoretical Studies
Heidelberg, Germany

# Abst

文よりも下のレベルでの極性分析は、
carryする要素が少ないがために難しい。

提案するframeworkでは、
マルコフロジックを用いて
隣との関係を見ることで、
これを解決する。
附けるのは極性スコアである。

69%の精度を示した。

# Intro

商品に対するレビュー。
良い商品についてユーザーは悪い面を、
逆に悪い商品について良い部分を書こうとする
傾向がある。(ほんとか？)
でも、欲しいのは商品がいいか悪いかだよね。

さらにさらに、
一つの文章で
良いことも悪いこともイってたりするから問題は難しい。

> “Despite the pretty design I would never
> recommend it, because the sound quality is unac-
> ceptable”

だから sub-sentence レベルでの解析が必要なのである。

## basic classification on subsentence level

discourse segments (会話単位?) で実験する。

関連研究として

- Rhetorical Structure Theory (RST) introduced by Mann and Thompson (1988)

これによると、セグメントは他のセグメントと関係を持っていて、さっきの例で言うとセグメントは3つ

    s1 = "Despite the pretty design"
    s2 = "I would never recommend it"
    s3 = "because the sound quality is unacceptable"

そしてこれらはこのような接続関係を持つ

    CONCESSION s1 s2
    CAUSE-EXPLATINATION-EVIDENCE s2 s3

この単位で極性分析するのが適切であると主張する。

## integrating neighborhood relations

さて、そのセグメントには極性を判定する情報が
十分にあることはめったにない。
それはトークンが単純に少ないからである。

しかし,
隣のセグメントとの関係はある。
例えば、
多くの2つの連続したセグメントは同じ極性を持つ。

## leveraging contrast relations

例えば but という語で接続されたセグメントの
40% は反対の極性を
60% は同じ極性を
持っていた。

全体で言うと極性が反対になるのは10% だけであった。

逆接でつながっていても
高い確率で同じ極性であると結論付けた。

真に極性が反転するかどうか

    CONTRACT | NO_CONTRACT

を判定するのが大事。

## collective classification

様々なアプローチに一つ共通するのは、
センチメント・レキシコンからタームをルックアップ
すること。
前にも行った通りセグメントが小さいために難しいけど
隣接するセグメントとの関係からマルコフロジックによって
見るのである。

## Markov Logic Formulation

セグメント c1, c2, ... について 論理式を作る。
論理式の重さを学習する。

まず、次の２つの論理式を立てる。

    not positive(x) => negative(x)
    not negative(x) => positive(x)

a-priori features。例えば、外部の辞書を用いた
それぞれのセグメントに対する極性スコア

    positive_source
    negative_source

    positive_source <=> positive
    n_s <=> n

### Statistical-Relational Representation

使うのは、Markov theBeast [2] です。
これはMarkov Logic Network のツール。

本論文の目新しいこととしては、
structural features を含めたこと。

ここで structural features とは
neghborhood relations と discourse relations
のこと

### neighborhood relations

隣接するセグメントは同じ極性でありやすい。(直感)

２つのセグメント x, y について

    pre(x, y) -- x の次が y である

という関係を用いて次

    pre(x, y) and positive(x) => positive(y)
    pre(x, y) and negative(x) => negative(y)

### Discourse Relations


    contrast(x,y)
    ncontrast(x,y)

を用いて

    contrast(x,y) and positive(x) => negative(y)
                      n           => p
    ncontrast(x,y) and positive(y) => positive(y)
                       n           => n

# 実験

Amazon review of 3 categories,
”Cell Phones & Service”,
”Gourmet Food” and ”Kitchen & Housewares”.

1 category について、
100ずつとってきて、
バランスを取るために、
長いものから20のposと20のneg

3人のあのテータで pos/neg/neu のラベル付け。
文章または節の単位で。
negについては kappa = 0.40 to 0.45、
posについては kappa = 0.60 to 0.84
(Fleiss)。

構成したモデルは pos/neg を附けるので、
アノテータで pos/neg について多数決を取って答えとする。
neuが一番多いか皆違ったらdata-set全体でのpos/negでの
多数決とする。これは、そもそもその特定の商品の
pos/negを知りたかったのだから、これでいい。

比較には、token 単位で行う。
segmentに属するtokenの極性をsegmentで決定する。

単純に sentiment term を既に在る辞書を用いて計算する。
ただし否定語を見つけた場合
> no, cannot, not, none, nothing, nowhere, neither, nor, nobody, hardly, scarcely, barely, -n't
positiveをnegativeに切り替える。(どうやって)

- SentiWordNet (SWN)
- Taboada and Grieve’s Turney Adjective List (TGL)
- Unigram Lexicon (UL)

segmentへの分解は
the discourse parser HILDA developed by duVerle and Prendinger (2009)
contrast, ncontrast 付きのデータをこれで得る。


|                 |pos|  P  |  R  |  F  |neg|  P  |  R   |  F  |  | A   |
|:----------------|:--|----:|----:|----:|:--|----:|-----:|----:|:-|----:|
|majority baseline|   | 0.00| 0.00| 0.00|   |51.60|100.00|68.07|  |51.60|
|SVM              |   |57.05|43.06|49.08|   |56.44| 69.47|62.28|  |56.66|
|MLN polarity     |   |53.21|69.58|60.31|   |59.90| 42.62|49.80|  |55.67|
|MLN neighborhood |   |66.38|72.94|69.50|   |72.02| 65.34|68.52|  |69.02|
|MLN contrast     |   |61.39|73.47|66.89|   |69.48| 56.65|62.41|  |64.79|

