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
  for (auto e: d[begin]) q.push(e);
  while (!q.empty()) {
    edge e = q.top(); q.pop();
    if (used[e.to]) continue;
    total += e.cost;
    used[e.to] = true;
    for (auto f: d[e.to]) q.push(f);
  }
  return total;
}

