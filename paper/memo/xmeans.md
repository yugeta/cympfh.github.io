# xmeans

## 参考

- 論文; http://www.cs.cmu.edu/~dpelleg/download/xmeans.pdf
- 記事; [適切なクラスタ数を推定するX-means法 - kaisehのブログ](http://d.hatena.ne.jp/kaiseh/20090628/1246223266)

k-means法ってゆうクラスタリング手法がある。
これは使う側がクラスタ数 `k` を決めないといけないために、
曰く、
`it scales poorly computationally`
である。

x-means法では、 2-means を繰り返して、
BIC または AIC のような情報量基準を以って
ループを停止する。
したがって、クラスタ数の推定も同時に行う。

