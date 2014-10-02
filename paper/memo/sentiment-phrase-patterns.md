# Sentiment classification using phrase patterns

Tetsuya Nasukawa 曰く、極性判定とは

1. sentiment expression を見つけて
1. 極性とその強さを調べて
1. そのexpressionの主語との関係を見つける。

- The AC Milan frustrated the Rome. ......(1)
- The Rome frustrated the AC Milan. ......(2)

(当然だけど) bag-of-words では両者の違いがない。

(1)ではRome が negative、
(2)ではAC Milan が negative

サンプルとして、サッカーのレビューを使う。

## Method

Part1: Sentiment evaluation

1. サンプルから語を選ぶ
1. フレーズパターンを構成する
1. フレーズパターンの極性を評価する

Part 2: Sentiment classification

1. テキスト中の語にタグをつける
1. フレーズパターンにマッチさせる
1. 極性を合計する

