# Learning Phrase Patterns for Text Classification

## Intro

テキスト分類。
N-gramなんかで十分な精度はある。
けれどもドメインに特化してしまうこと、applicationに依存してしまうことから
一般性がない。
n-gramに補充する素性の一つとして、phrase patternを使いたい。

## 先行

### Jaillet+, 2006
topic categorization

### Wiebe+, 2005

文章の一人称を教師ナシで
これは目的語を含んだフレーズパターンで分類した。
先行研究よりも高い精度。

### Sun+, 2007

第二外国語学習者の書いた誤文法を検出。

### Thur+, 2010 and Davidov+, 2010

TwitterやAmazonレビューから「皮肉」な文を検出

### Zhang+, 2010

memo/N10-1108.md

で紹介したとおり、 N-gram よりも高精度であった！（まだ読んでない）

## 提案手法

word class に分類してから、それのパターンフレーズを探す。
word class を何にするかは目的によるけど、
例えばPOSだろう。
word class は適切な粒度を与えてくれる。
また、word and/or word-class を使うかは指定する必要は無い。

パターンとは、語の列
`[a,b, .. c]`
一方、文も語の列
`[x,y, .. z]`

マッチするとは、パターンが文の部分sequence になってること

