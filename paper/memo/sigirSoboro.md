# Ranking Retrieval Systems without Relevance Judgments

Information retrieval,
特に検索と考えてしまうけれど、
いかに、人手判定のコストを低くして、
精度を見積もるか。

## run

`run` とは、一つの検索システムのこと。
パラメータを変えたものは、別の run として見做す。

## 伝統的なTRECのやりかた

50 topics それぞれについて、
run は 1000 の、検索結果を出力するとする。
検索結果とは、1から1000の順にランクがついている。

run が `m` 個あるとき、
`m' (<= m)` 個のrunを、
official run
だとする。

official runs が出力した、トップ100を集めると、
`50 topics * m' runs * 100 docs`
が集められる。
これらから重複を除いたものを
official pool と呼ぶ。

さて、伝統的なやり方は、
この official pool に対して、人間が、
検索結果としてふさわしいかふさわしくないかを判断して、
ふさわしいものだけを残したデータのことを、
`qrels`
と呼ぶ。

さて、run が出力した 1000 docs と、`qrels` とを
見比べることで、いかなる手法にして、精度を見積もる。
ここでは触れない。

> MAP, P-5, P-10, infAP, bpref

`trec_eval`
は公式から公式のツールとして、手に入れることができる。
どのOSでも使うことができる。
```bash
$ trec_eval -m trec_all qrel that
```
などと使う。

## 本論文の提案

なんと人間の判定は使わない。
official pool を作るところ迄は同じ。
そのあと、
official pool から、ランダムにdoc を選択して、
`pseudo-qrels`
を作る。

これを、`qrels`と見做して`trec_eval` することで結果を選ぶ。

1. 大変に単純だ。
1. 論文にするほどでもない。
1. 掲示板にでも書いておけばいいものを。

## 結果

Figure 2 あたりを見ればいいだろう。
マジメにqrelを作って、
今回は `MAP` という指標で、精度を見積もっている。
提案手法はランダムを使うので、区間で表現されている。

## 感想

値自体はそんないい精度を推定できていない。
傾向は正しく反映されているとは言える。


