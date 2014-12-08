struct Topological {
  int N;
  vector<vector<int>> rd; // 逆隣接リスト

  Topological(vector<vector<int>>&d) {
    N = d.size();
    rd.resize(N);
    rep (u, N) {
      for (int v : d[u]) {
        rd[v].push_back(u);
      }
    }
  }

  vector<int> L;
  vector<bool> used;

  vector<int> sort() {
    L.resize(0);
    used = vector<bool>(N, false);
    rep (i, N) visit(i);
    return L;
  }

  void visit(int u) {
    if (used[u]) return;
    used[u] = true;
    for (int v : rd[u]) {
      visit(v);
    }
    L.push_back(u);
  }
};
