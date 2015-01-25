# 参考

- [C++ and STL reference](http://www.cppll.jp/cppreference/index.html)
- [１次元幾何ライブラリ - not's memo - TopCoder部](http://topcoder.g.hatena.ne.jp/not522/20130401/1364781205)

# [テンプレート](src/template.cc.html)

- [Mac用代替](src/include.cc.html)
- [ループマクロについて](memo/loop.html)

# [グラフ](src/graph.head.cc.html)

## 最短路

- [Dijkstra](src/graph.dij.cc.html)
    - [test](src/graph.dij.test.cc.html)
    - [sample](src/graph.dij.sample.cc.html)
- [Warshall-Floyd](src/graph.wall.cc.html)
    - [sample](src/graph.wall.use.cc.html)

## 最小全域木

- [Prim](src/graph.prim.cc.html)
    - [sample](src/graph.prim.use.cc.html)
    - [maze](src/graph.prim.maze.cc.html)
- [Kruskal](src/graph.kruskal.cc.html)
    - [sample](src/graph.kruskal.use.cc.html)

## 最大流量

- [Ford-Fulkerson](src/graph.maxflow.cc.html)
    - [sample](src/graph.maxflow.use.cc.html)

## [トポロジカルソート](src/graph.topological.cc.html)

- [Wikipedia:ja](http://ja.wikipedia.org/wiki/トポロジカルソート)
- [実装例](http://code-thanks-festival-2014-a-open.contest.atcoder.jp/submissions/294748)

## [強連結成分分解](src/graph.scc.cc.html)

- [非閉路有向グラフへの変換](src/graph.scc.dag.cc.html)
- 参考
    - [Strongly connected component - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Strongly_connected_component)
    - [2-SATと強連結成分分解 - naoya_t@hatenablog](http://naoyat.hatenablog.jp/entry/2013/07/13/220034)

# [行列](memo/matrix.html)

## 行列式

- [定義](src/mat.det.naiiv.cc.html)
- [Camelの方法](src/mat.det.camel.cc.html)

# 幾何

- [平面テンプレート](src/geo.2d.cc.html)
    - [test](src/geo.2d.test.cc.html)
- [線分交差判定](src/geo.2d.intersection.cc.html)

## 多角形

- [三角形の面積](src/geo.2d.triangle.cc.html)
- [三角形の外接円](src/geo.2d.circum.cc.html)
- 多角形の内外判定
- 凸包

## 円

- [Circles Intersection | Aizu Online Judge](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=0023)
    - [solve](http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=1177149#1)
    - TODO: ちゃんと書く

# 集合

- [Union-Find](src/set.union.find.cc.html)

# 動的計画法

## Knapsack problem

- [0-1 knapsack](src/dp.knapsack.01.cc.html)

# 二分探索

- [出現回数](src/bin.count.cc.html)

# 素数

- [エラトステネスの篩](src/prime.sieve.cc.html)

# [サイコロ](src/dice.cc.html)

- [AOJ1181_Biased Dice](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1181)
    - [src](https://gist.github.com/cympfh/6a1fbd8b8f2c9b292ee3)

# 暦

- [ツェラーの公式](src/misc.zeller.cc.html)
    - [What day is today? | Aizu Online Judge](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=0027)

# misc

- [bit count](src/bit.count.cc.html)
- [K-平均法](src/misc.kmeans.cc.html)
- [Pascal's Triangle](src/misc.pascal_triangle.cc.html)

# [テスト環境](memo/test.html)
