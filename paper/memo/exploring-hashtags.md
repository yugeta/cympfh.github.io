# Exploring Twitter Hashtags

2011年の論文なので古い部類だろうなあ

## Intro

SMS language

- abbreviation (e.g. "4 u")
- emoticons (e.g. ":)" )

Twitter-specific forms

- @-replies
- hashtags

> @merazindagi Thanks! Will make more 4 U. Live performances in
> #boulder area will be on http://saxy.us :) #jazz #rock #funk
> #dance #livemusic

ハッシュタグはそのツイートが何の目的であるかを教えてくれる
けど
複数のツイートが沢山含まれるようなものは一体何なのかわからなくなる．
そこで，
co-occurrences に基づく辞書の構築，
分類器の構成
を考え，最終的にアプリケーションを作成する

## Dataset

29,000,000 tweets
ノイズの少ない310,000種類のハッシュタグは取り除いて，
85,503種類を使った

## Hashtag co-occurrences

### Dictionary

共起 where ハッシュタグ hi, hj
C(hi, hj) = # { t | t <- tweets, t has hi and t hash hj }

辞書
D(h) = {(h', C(h, h')) | h /= h'}

### Similarity of two hashtags

hashtag, h -> synset, s

similarity,
S(h1, h2) = max [ S'(s1, s2) | s1 <- synset h1, s2 <- synset h2 ]

S' として、

PythonのnltkのWordNet module には、
次の2種類が組み込まれている

1. path distance similarity
1. Wu-Palmer distance

それぞれ、Spath, Swp と呼ぼう．

どちらも数字が大きいほうが近いことを意味する

実際の値を見てみると、

|                           | Spath | Swp  |
| 共起ハッシュタグ          | 0.12  | 0.37 |
| Twitter (ランダムな2単語) | 0.07  | 0.26 |

って感じ．

## Clustered graph

共起してたら枝をつなぐ，でグラフがかけた．
連結成分というクラスらリングもできる．

# Classification

## hashtag classes

まあハッシュタグは何かそのものを表しているわけだけど，

* `organization`
* `geolocation`
* `person`
* `event`: particular interest on Twitter
* `category`: all other hashtags

に分類するのを第一目標とする

例として，

| organization | #google, #nokia       |
| geolocation  | #europe, #uk, #graz   |
| person       | #obama, #madonna      |
| event        | #christmas, #election |
| category     | #fun, #math, #ipod    |

## Machine-learning

最大エントロピー (MaxEnt)
が SciPy とかいう中で実装されてるので
それを使う．

### features

* ハッシュタグ周りの window size 5 の words
* その words の shape 
* その words の POS tag
* その words の geographical background knowledge
* ハッシュタグの shape
* ハッシュタグがツイートの最初であるか
