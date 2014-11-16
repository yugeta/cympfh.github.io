# Automatic acquisition of hyponyms from large text corpora

パターンを使って知識獲得 (情報抽出) の初出っぽい。

それらしい、6つのパターンを手でまず作る。

一例として、

```
pattern ::= NP [,] especially NPs
NPs ::= NP | NP, NPs | NP and NP | NP or NP
```

> most European contries, especially France, England and Spain

という文から

- hyponyms("France", "European contries")
- hyponyms("England", "European contries)
- hyponyms("Spain", "European contries)

という関係を得る。

パターンを新たに学習することはしません。
