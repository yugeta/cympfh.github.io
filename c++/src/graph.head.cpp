struct edge {
  int from, to, cost;
  edge(int f,int t,int c) { from=f; to=t; cost=c; }
};

struct graph {
  int n;
  vector<edge> *g;
  graph(int m){
    n = m;
    g = new vector<edge>[m];
  }
  void add(int u,int v,int c){
    edge e(u, v, c);
    g[u].push_back(e);
    edge f(v, u, c);
    g[v].push_back(f);
  }
};

ostream& operator<<(ostream& os, const edge& e) {
  os<<"(edge "<<e.from<<' '<<e.to<<' '<<e.cost<<')';
  return os;
}

ostream& operator<<(ostream& os, const graph& g) {
  os << "(graph " << g.n;
  rep (i, g.n) for (edge&e: g.g[i]) os << ' ' << e;
  os << ')';
  return os;
}
