# 言語モデルとはなにか。

人間が用いる言葉らしさを確率とするモデル。
そのために世の中にあるコーパスを用いる

- 日本語書き言葉均衡コーパス
- /roo にある

## 目的

- 基本
    + 機械翻訳: 翻訳結果が自然か？
    + かな漢字変換: 変換候補、送り仮名
- 変化球
    + 翻字検出:
        * マイケルとMichaelが同じである！と検出する.
        * (マイ, Mi), (ケル, chael) みたいなペアを沢山持っておいて、コーパスから作る
    + Topic tracking
    + オンラインコミュニティの退会予測

# シャノンゲーム

> I want to go to `w`.

`w` には何が入るか？

```haskell
Pr(`w` | I want to go to)
```

を計算しろと同じ。

## N-gram

- 一つの回答がこれ
- (n-1)の語、品詞、クラスを文脈に次を予測する。
- 文頭(BOS)を考慮するパターンとしないパターンがある。

## smoothing

ゼロ頻度問題の解決法

- 加算smoothing
    + 使えない
- 低次 n-gram
    - 補完型
        + 常に低次を考慮する
        + Interpolated Kneser-ney smoothing
    - back-off型
        + 高次が存在しない時にだけ、低次を考慮する
        + Good Turing


### Good Turing

頻度の頻度を用いる。

頻度 c が例えば次のようにあるとき

- tuna = 2
- salmon = 3
- kohada = 1
- egg = 1
- squid = 1

頻度の頻度 N_c は次のようになる

- N_1 = 3
- N_2 = 1
- N_3 = 1

頻度 c を次のように discount

```haskell
c* = (c + 1) * N_{c+1} / N_c
```

`c = 0` についても、`c* > 0` (???)

## 言語モデルの評価

*Perplexity*, 情報理論的距離。低いほどモデルに近い。

Document `D = N words`

```haskell
PP(D) = P(D) ^ (1 / N) = prod P(w)  ^ (1 / N)
```

*クロスエントロピー* とは

両辺対数のマイナスとって

```haskell
H(D) = - 1 / N * log P(D) = - 1 / N * sum (log P(w))
```

## 応用

- ニューラル言語モデル (Bengio 2003): 分散表現
- 大規模データ (Brants EMNLP 2007): stupid back off (大規模の力)

## toolkit

- SRI language model toolkit: Knesey-ney が使える

