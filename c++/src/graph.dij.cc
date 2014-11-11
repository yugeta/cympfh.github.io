// ds[t] is the shortest distance from s to t
vector<int>
dij(const graph &g, int s) {
  vector<int> ds(g.n, INF);
  ds[s] = 0;
  queue<int> q;
  q.push(s);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (edge&e: g.g[u]) {
      int d = ds[u] + e.cost;
      if (ds[e.to] > d) {
        ds[e.to] = d;
        q.push(e.to);
      }
    }
  }
  return ds;
}
