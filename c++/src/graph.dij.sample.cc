#include <queue>
#include <iostream>

/*
 ** input
 *
 *    G = (V, E)
 *    |V| = N ~ 1e3
 *    V = { 1, 2, .., N }
 *    |E| = m ~ 1e4
 *    distance of `e = (u, v)` in `E`: d(u, v)

 ** output
 *
 *    `m` in `V`
 *    such that
 *
 *    sd(s, m) == sd(m, t)
 *
 *    where
 *
 *    `sd(u, v)` is the shortest distance from `u` to `v`
 *      where `u` in `V` and `v` in `V`
 *
 
 ** sample
 *
 *    $ cat input
 *    3 3
 *    1 2
 *    1 3 3
 *    3 2 3
 *    1 2 1
 *    $ cat output
 *    3
 *
 */

using namespace std;

const int INF = 1e9;

const int MAX = 1001; // max number of vertexes
int d[MAX][MAX]; // [u][v] = distance from `u` to `v`
vector<int> neigh[MAX]; // [u] = neighbor vertexes of the `u`
int N; // number of vertexes

int froms[MAX]; // [u] is the shortest distance from `s` to `u`
int fromt[MAX]; // [u] is the shortest distance from `t` to `u`

void dij(int s) {
  queue<int> q;

  for (int u=0; u < N; ++u) {
    froms[u] = INF;
  }
  froms[s] = 0;

  q.push(s);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v: neigh[u]) {
      int r = froms[u] + d[u][v];
      if (froms[v] > r) {
        froms[v] = r;
        q.push(v);
      }
    }
  }
}

void r_dij(int t) {
  queue<int> q;

  for (int u = 0; u < N; ++u) {
    fromt[u] = INF;
  }
  fromt[t] = 0;

  q.push(t);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v: neigh[u]) {
      int r = fromt[u] + d[u][v];
      if (fromt[v] > r) {
        fromt[v] = r;
        q.push(v);
      }
    }
  }
}

int main() {

  int m, s, t;
  cin >> N >> m; // #vertex, #edge
  cin >> s >> t; // start vertex, goal vertex
  --s; --t; // -> 0-indexed

  // init `d`
  for (int i = 0; i < N; ++i) {
    for (int j = 0; j < N; ++j) {
      d[i][j] = INF;
    }
    d[i][i] = 0;
  }

  for (int i = 0; i < m; ++i) {
    int x, y, k;
    cin >> x >> y >> k; // a edge from `x` to `y` whose distance is `k`
    --x;--y;
    d[x][y] = d[y][x] = k;
    neigh[x].push_back(y);
    neigh[y].push_back(x);
  }

  dij(s);   // calc `froms[]`
  r_dij(t); // calc `fromt[]`

  for (int u = 0; u < N; ++u) {
    if (froms[u] == fromt[u] && fromt[u] != INF) { // NOTE: INF != INF in Euclidean distance
      cout << (u+1) << endl; // in 1-indexed, the `(u+1)` is the middle node
      return 0;
    }
  }
  cout << "not exists" << endl;

  return 0;
}
