# A semantic similarity measure based on lexico-syntactic patterns

パターンを使って、名詞の意味的な近さ (PatternSim) を定義する。

パターンは、
「言語学的知識を使って」
18つ、定める。

もともと、Hearstが、patternを使う知識獲得をやってたらしいが、
(http://dl.acm.org/citation.cfm?id=992154)
その中では、やはり手で作った 6 つのパターンを定めてたらしい。
本論文の18つは、それに12つ加えたものである。

このパターンは、
hypernymic あるいは synonymic な関係を抽出しそうなものらである。

例えば、

- such NP as NP, NP [,] and/or NP (Hearst)
- NP, i. e. [,] NP (addition)

である。

で、そのパターンについて、
Finite-state transducers (FSTs) というのを、
`UNITEX`
なるツールを用いて作成する。
これが一番重たいらしい。

