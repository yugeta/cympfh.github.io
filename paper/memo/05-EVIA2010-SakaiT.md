# Ranking Retrieval Systems without Relevance Assessments - Revisited

決して人手を使ってはならない。

トピック `t <- [1 .. T]`
について、
run `i <- [1 .. n]`
は、結果として set of documents `Ret[i][t]` を返す。

基本コンセプトは、
多くの run が返した document は結果として正しいものである。
document 全てにランク付けし、runごとに、上位30のdocument を用いる。

## Soboroff+

重複を保ったpool から 10% をランダムに選択する

## Aslam/Savell

runの、全体との類似度 (Jaccard) でランク付けする

