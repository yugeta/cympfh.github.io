# 参考

- [C++ and STL reference](http://www.ccll.jp/cppreference/index.html)
- [１次元幾何ライブラリ - not's memo - TopCoder部](http://topcoder.g.hatena.ne.jp/not522/20130401/1364781205)

# [鋳型](src/template.cc.html)

- [要求の代替](src/include.cc.html)
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

# 幾何

- [平面テンプレート](src/geo.2d.cc.html)
    - [test](src/geo.2d.test.cc.html)
- [線分交差判定](src/geo.2d.intersection.cc.html)
- [三角形の面積](src/geo.2d.triangle.cc.html)
- 多角形の内外判定
- 凸包

# 集合

- [Union-Find](src/set.union.find.cc.html)

# 動的計画法

## Knapsack problem

- [0-1 knapsack](src/dp.knapsack.01.cc.html)

# misc

- [bit count](src/bit.count.cc.html)
- [ツェラーの公式](src/misc.zeller.cc.html)

# [テスト環境](memo/test.html)
