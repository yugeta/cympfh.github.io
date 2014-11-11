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

