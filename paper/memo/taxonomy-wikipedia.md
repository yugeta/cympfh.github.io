# Deriving a large scale taxonomy from Wikipedia

## Goal

Wikipedia から、is-a 関係、not-is-a 関係を拾ってくる

## Motivation

Wikipedia には、階層的ではないカテゴライズがしてある。
例えば、"CAPITALS IN ASIA" というカテゴリがある。
これは、一種の is-a だ。
(おそらく、
`(Tokyo, Japan)`
から、
`hyponym(Tokyo, Japan)`
を取ってこれると言いたんだろう)

## Method

1. Category network cleanup

- 165,744 category nodes
- 349,263 links

明らかに不要なカテゴリは除く。
結構あって、

- 127,325 categories
- 267,707 links

になった。

2. Refinement link identification

```
Y X and X BY Z
(e.g.  MILES DAVIS ALBUMS and ALBUMS BY ARTIST).
```

こんなパターンは、Wikipedia において頻出する。

このように、
名前に "BY" の入ってるものは
`is-refined-by`
という意味的関係にあると考える。

```
refine   …‘を'『精製する』,精錬する / 〈言葉・態度など〉‘を'『洗練する』,上品にする,優雅にする
```

あー、面倒臭くなった
