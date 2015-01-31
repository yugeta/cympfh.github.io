% Fenwick tree, binary indexed tree

## 参考

- [Fenwick tree - Wikipedia](http://en.wikipedia.org/wiki/Fenwick_tree)

## メモ

要素に数値を持つ長さ$N$の列
$v = \{ v_0, v_1, \ldots, v_{n-1} \}$
について、
次の二つの操作が共に
$O(\log(N))$
で行える。

1. $v_i += x$ (`add(i, x)`)
2. $v_0 + v_1 + \cdots + v_n$ (`sum_up(n)`)


