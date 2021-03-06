const int MAXV = 900;
vector<edge> G[MAXV];
int level[MAXV];
int iter[MAXV];

void add_edge(int from, int to, int cost = 1) {
  G[from].push_back(edge(G[to].size(), to, cost));
  G[to].push_back(edge(G[from].size()-1, from, 0)); // 註意。非対称
}

void bfs(int s) {
  memset(level, -1, sizeof(level));
  queue<int> q;
  level[s] = 0;
  q.push(s);
  while (!q.empty()) {
    int v = q.front(); q.pop();
    for (auto &e : G[v]) {
      if (e.cost > 0 && level[e.to] < 0) {
        level[e.to] = level[v] + 1;
        q.push(e.to);
      }
    }
  }
}

int dfs(int v, int t, int f) {
  if (v == t) return f;
  for (int &i=iter[v]; i < G[v].size(); ++i) {
    edge &e = G[v][i];
    if (e.cost > 0 && level[v] < level[e.to]) {
      int d = dfs(e.to, t, min(f, e.cost));
      if (d > 0) {
        e.cost -= d;
        G[e.to][e.from].cost += d;
        return d;
      }
    }
  }
  return 0;
}

int max_flow(int s, int t) {
  int flow = 0;
  for (;;) {
    bfs(s);
    if (level[t] < 0) return flow;
    memset(iter, 0, sizeof(iter));
    for (int f = 0; (f = dfs(s, t, INF)) > 0; flow += f);
  }
  return flow;
}
