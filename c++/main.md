# c++

```
g++ -std=c++0x ./%
```

## link

- [C/C++ リファレンス](http://www.cppll.jp/cppreference/index.html)
ref STL

## src/

### [template](src/template.cpp.html)

- [alt includes](src/include.cpp.html)

### [graph](src/graph.head.cpp.html)

- Shortest Path
    - [Dijkstra](src/graph.dij.cpp.html)
    - [Warshall-Floyd](src/graph.wall.cpp.html)
        - [Warshall-Floyd - use](src/graph.wall.use.cpp.html)

- Minimum Spanning Tree
    - [Prim](src/graph.prim.cpp.html)
        - [Prim - use](src/graph.prim.use.cpp.html)
        - [Prim - maze](src/graph.prim.maze.cpp.html)
    - [Kruskal](src/graph.kruskal.cpp.html)
        - [Kruskal - use](src/graph.kruskal.use.cpp.html)

- [Max Flow](src/graph.maxflow.cpp.html)
    - [Max Flow - use](src/graph.maxflow.use.cpp.html)

### misc

- [bit_count](src/bit.count.cpp.html)

### test

- [テスト環境](src/test.html)
