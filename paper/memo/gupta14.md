# Improved Pattern Learning for Bootstrapped Entity Extraction

## Goal

あるPOSのword (たとえば名詞) について、
entityを決定づけるような、
パターンを抽出する。

## Method

windowサイズ2 - 4 を固定して、
token の列をパターンとする。

例えば、

- "own a car"
- "my pet car"

という
tokenの列から、

- "own a [X]"
- "my pet [X]"

というパターンを作る

パターンを組み合わせてスコアをつける。
例えば、

- own a car
- own a cat
- my pet cat
- my pet dog

から、

`{{dog, cat}, {car}}`

というクラスタリングをする

## Bootstrapped ってなんだろう

1. labed data をコーパスとする
1. pattern を抽出
1. pattern をスコアリングして上位だけ残す
1. pattern を使ってentities を取る
1. labeld data に追加

を繰り返す。

