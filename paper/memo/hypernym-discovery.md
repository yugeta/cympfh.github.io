# Learning syntactic patterns for automatic hypernym discovery

パターンの発掘は、
[freepal](./memo/freepal.html)
と同じく、
dependency tree
の上の、二つの名詞間の最短路。
`lexico-syntactic patterns`
と読んでいる。

そちらでは、列に潰しちゃうけど、
これは木の状態のまま持ってパターンとするのが違う。
あと、stop-word を取り除いてる。
あちらではどうしてたっけな。

でも、長さ2とか3とかくらいの短いパターンしか,
有用でなかったらしい。
