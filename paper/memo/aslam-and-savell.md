# On the Effectiveness of Evaluating Retrieval Systems in the Absence of Relevance Judgments

./memo/05-EVIA2010-SakaiT.md
からの参照。

Soboroffのやつ (たしかランダムに選ぶやつ) では
実際のデータと彼らの出した結果に相関関係があることを見た。
何故そうであるかの理由付けをする。
そのために、`system similarity` という指標を導入する。

```haskell
-- i番目のsystemの全体との類似度
avgSysSim :: RunIndex -> TopicIndex -> Double
avgSysSim i t =
  total / (n - 1)
    where
      total = sum [ sysSimilarity Ret[i][t] Ret[j][t]
                  | j <- [1 .. n]
                  , j /= i ]

sysSimilarity :: Document -> Document -> Double
sysSimilarity s1 s2 = a / b
  where
    a = size $ a and b
    b = size $ a or b
```

