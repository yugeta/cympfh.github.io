# Finding minimal generalizations for unions of pattern languages and its application to inductive inference from positive data

`k-mmg` (k-minimal multiple genelizations)
とは、
たかだか k のパターンの和で表現される言語のこと。

本論文では、k-mmg を求めるための効率的なアルゴリズムを与える。

## 導入

いろーんなアルゴリズムが発明されました！

- PAC learning [Val84]
- EFSs by Smulyan (1961)
- unifying framework for languages by Arikawa+ [ASY92]

然しながら、如何に、"overgeneralizations" (過学習ならぬ過汎化) を避けるかが味噌なのです。

実直な解決法は、言語のその濃度を最小限にすること (minl)。
これは、また、"finite thickness" 或いは "finite elasticity" と呼ばれる問題を含む。
そこで我々は、minl を統合したようなアルゴリズムでもって解決する。



