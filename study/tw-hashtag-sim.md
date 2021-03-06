# 2014/06/23

## 進捗レポジトリ

https://github.com/cympfh/shameful-hashtag

## 目的

ハッシュタグ検索で，shameが多いものを探したい

## 参考の数字

今まで集めたデータの，合計の内 shame の割合は
```
0.005067567567567568
= 0.51%
```
であった

ただしこれは，手でラベリングした結果である．

今回はML-Askの(貧しい)辞書を使う．
登録語数は64.

## ハッシュタグ付きのsample

### 2014/06/18 16:24 - 22:40
27/14606 = 0.18%

### 2014/06/19 00:00 - 02:13
15/4551 = 0.32%

### 2014/06/19 0234 - 18:02
39/21568 = 0.18%

### 2014/06/19 2212 - 2300
4/2462 = 0.16%

### 2014/06/19 2355 - 0221
5/4868 = 0.1%

### macro average
90 / 48055 = 0.19%

## ハッシュタグ無し

2014/06/17 17:00 - 21:20

507 / 187139 = 0.27%

## Graph の説明

### color

undefined: ghostwhite
{0}: white
(0, 0.1]: aliceblue
(0.1, 0.2]: cyan
(0.2, 0.3]: cyan2
(0.3, 0.4]: cyan3
(0.4, infty): cyan4

### 直感

shameの感情が多いハッシュタグ(#A)が存在するとする
`#A`と共起するまた別の`#B`は
また，shameの感情が多い

## 結論

わりとそう．
`#A` の隣接を調べる.
多いのをたどっていく．

# 2014/07/16

## 進捗レポジトリ

https://github.com/cympfh/cor-between-tag-and-em

## ツイートの類似度はかりかた。

ツイートの類似度っていうか、
二つのハッシュタグ `#A` と `#B` との類似度を考える。

`doc A` を `A` というハッシュタグを含むツイート群とする。
今迄やってたのは、
`doc A` と `doc B` とのテキスト類似度を、tri-gram で計算していた。

## 知見

tri-gramで似てればキーワードも似てる。
つまり、
キーワードベースであるML-Askで同じ感情が抽出されれば、
tri-gramで類似と見做される。

## 想定するストーリー

初期のハッシュタグを、ML-Askで拾う。
ML-Askでは拾えないようなのを、共起を見て、また本手法を用いて
辿って行く。

あの絵で右上にあるようなやつが、
ML-Askだけで拾った物を同じ傾向を示す。
本手法で拾って価値のあるのは右下のやつ。

# 2014/08/19

## 進捗レポジトリ

https://github.com/cympfh/2014-08-19


## 試すべきアイデア

- 共通のツイートをまず除くこと

`doc (A and B) = doc A and doc B`
として、
`doc A - doc (A and B)`
と
`doc B - doc (A and B)`
とを比べないと公平じゃない

- 単純にデータの量ふやすこと。

- URL を置換しなくていい

## 技巧

### 最も良い類似尺度の試し方。

自己のデータ群は全て類似してるはずである。
それを二分割して、いくつかの尺度で試してみる。

### 安定性


ツイートを少しずつ加えていって安定性を見る。
スケールがどうこうとか言ってた。
