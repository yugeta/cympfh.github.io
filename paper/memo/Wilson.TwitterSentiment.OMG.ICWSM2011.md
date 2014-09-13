# Twitter Sentiment Analysis: The Good the Bad and the OMG

twitter ツイートの pos/neg 判定

予め言っておくとゴミ。

## データセット

- 明らかに pos/neg が分かるようなハッシュタグが附いてるデータセット
- 明らかに pos/neg が分かるような顔文字が附いてるデータセット

を用いることで、
テストデータを作成する。

## 素性

分類器に何を用いたかが実は書いてないんだけど、
気にしないことにして、
素性は

- n-gram
- lexicon (感情語辞書)
- POS
- twitter特有表現 (とくに顔文字)

順に、

- 6割
- ちょっと役立った
- ほーーんのすこしだけ役立った
- めっちゃ役立った


終わり。
