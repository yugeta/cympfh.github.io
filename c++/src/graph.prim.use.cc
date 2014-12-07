#include <bits/stdc++.h>
using namespace std;

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
int N = 7;
vector<edge> d[MAXN];

void add_edge(int u,int v,int c) {
  d[u].push_back((edge){u, v, c});
  d[v].push_back((edge){v, u, c});
}

int prim() {
  int begin = 0;
  int total = 0;

  vector<bool> used(N, false);
  used[begin] = true;

  priority_queue<edge, vector<edge>, greater<edge>> q;
  for (auto&e: d[begin]) q.push(e);
  while (!q.empty()) {
    edge e = q.top(); q.pop();
    if (used[e.to]) continue;
    total += e.cost;
    used[e.to] = true;
    for (auto&f: d[e.to]) q.push(f);
  }
  return total;
}

int main() {

  // this graph on the page: http://ja.wikipedia.org/wiki/プリム法
  add_edge(0,1,7);
  add_edge(0,3,5);
  add_edge(1,2,8);
  add_edge(1,3,9);
  add_edge(1,4,7);
  add_edge(2,4,5);
  add_edge(3,4,15);
  add_edge(3,5,6);
  add_edge(4,5,8);
  add_edge(4,6,9);
  add_edge(5,6,11);

  cout << prim() << endl;

  return 0;
}


