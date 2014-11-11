#include <bits/stdc++.h>
using namespace std;

#define rep2(i,n,m) for(int i=(int)(n);i<(int)(m);++i)
#define rep(i,n) rep2(i,0,n)
#define iota(i,n,b,s) for(int i=int(b);i<int(b+s*n);i+=s)

#define INF (1e9)
#define EPS (1e-9)
#define cons(a,b) (make_pair(a,b))
#define car(a) (a.first)
#define cdr(a) (a.second)
#define cadr(a) (car(cdr(a)))
#define cddr(a) (cdr(cdr(a)))
#define trace(var) cout<<">>> "<<#var<<" = "<<var<<endl;

struct edge {
  int from, to, cost;
  edge(int f,int t,int c) { from=f; to=t; cost=c; }
};

bool operator< (const edge& left, const edge& right) {
  return left.cost < right.cost;
}
bool operator> (const edge& left, const edge& right) {
  return left.cost > right.cost;
}

ostream& operator<<(ostream& os, const edge& e) {
  os<<"(edge "<<e.from<<' '<<e.to<<' '<<e.cost<<')';
  return os;
}

#define N 1000
priority_queue<edge,vector<edge>,greater<edge>> edges;
void add_edge(int u, int v, int c) {
  edges.push(edge(u, v, c));
}

int
kruskal() {
  int total = 0;
  bool used[N];
  rep(i, N) used[i] = false;

  auto es = edges;
  while (!es.empty()) {
    edge e = es.top(); es.pop();
    if (used[e.from] && used[e.to]) continue;
    used[e.from] = used[e.to] = true;
    // cerr << e << endl;
    total += e.cost;
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

  cout << kruskal() << endl;
  return 0;
}
