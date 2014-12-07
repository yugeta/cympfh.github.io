#include <bits/stdc++.h>
#include <ctime>
using namespace std;

/*
 * this program generates maze
 * with random parameter
 * using Prim method
 *
 * the size of maze
 * is setted
 * as const `W` and `H`
 */

#define rep2(i,n,m) for(int i=(int)(n);i<(int)(m);++i)
#define rep(i,n) rep2(i,0,n)
#define iota(i,n,b,s) for(int i=int(b);i<int(b+s*n);i+=s)

#define INF (1e9)
#define EPS (1e-9)

struct edge {
  int from, to, cost;
};
bool operator> (const edge& left, const edge& right) {
  return left.cost > right.cost;
}

ostream& operator<<(ostream& os, const edge& e) {
  os<<"(edge "<<e.from<<' '<<e.to<<' '<<e.cost<<')';
  return os;
}

#define MAXN 1000
vector<edge> d[MAXN];

void add_edge(int u,int v,int c) {
  d[u].push_back((edge){u, v, c});
  d[v].push_back((edge){v, u, c});
}

// W and H are parameters to determine the size of the maze.

const
int W = 20,
    H = 4,
    N = W * H;

bool walk[N][N];

int prim() {
  int begin = 0;
  int total = 0;

  vector<bool> used(N, false);
  used[begin] = true;

  priority_queue<edge, vector<edge>, greater<edge>> q;
  for (auto e: d[begin]) q.push(e);
  while (!q.empty()) {
    edge e = q.top(); q.pop();
    if (used[e.to]) continue;
    total += e.cost;
    used[e.to] = true;
    walk[e.from][e.to] = true;
    walk[e.to][e.from] = true;
    for (auto f: d[e.to]) q.push(f);
  }
  return total;
}

int main() {

  srand(time(NULL));
  rep(i, N) rep(j, N) walk[i][j] = false;

  rep(i, H) rep(j, W) {
    int idx = i * W + j;
    if (i < H-1) {
      int idx2 = idx + W;
      add_edge(idx, idx2, rand() % 30);
    }
    if (j < W-1) {
      int idx2 = idx + 1;
      add_edge(idx, idx2, rand() % 30);
    }
  }

  prim();

  rep(i, 2*H+1) {
    rep(j, 2*W+1) {
      char c = '#';
      if (i % 2 && j % 2) {
        c = ' ';
      }
      else if (i % 2 && j > 0) {
        int idx = (i/2) * W + ((j-1)/2);
        if (walk[idx][idx+1]) c = ' ';
      }
      else if (j % 2 && i > 0) {
        int idx = ((i-1)/2) * W + (j/2);
        if (walk[idx][idx+W]) c = ' ';
      }
      cout << c;
    }
    cout << endl;
  }

  return 0;
}

/* sample output
 *
 
#########################################
# #       #     #   # # #     # #     # #
# ### ##### ##### # # # # # ### # ##### #
#   #   # #   # # #   #   # #   # # # # #
### ### # # ### # ### # ### # # # # # # #
# #               # # # #     #         #
# ### ####### # # # # ### ### ##### #####
#           # # #   #       # #         #
#########################################

 *
 */
