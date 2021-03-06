struct StronglyConnectedComponents {
  int N, K;

  vector<bool> used;
  vector<int> vs; // 帰り掛け順
  vector<vector<int>> arc;
  vector<vector<int>> arc_r;
  vector<int> cmp; // 連結成分

  void dfs(int v) {
    used[v] = true;
    for (int u : arc[v]) {
      if (!used[u]) dfs(u);
    }
    vs.push_back(v);
  }

  void rdfs(int v, int k) {
    used[v] = true;
    cmp[v] = k;
    for (int u : arc_r[v]) {
      if (!used[u]) rdfs(u, k);
    }
  }

  /* NOTE: passing adjacency list */
  StronglyConnectedComponents(vector<vector<int>>&d) {
    N = d.size();

    cmp.resize(N);
    arc.resize(N);
    arc_r.resize(N);
    rep (u, N) {
      for (int v : d[u]) {
        arc[u].push_back(v);
        arc_r[v].push_back(u);
      }
    }

    vs.clear();
    used = vector<bool>(N, false);
    rep (i, N) if (!used[i]) dfs(i);

    int k = 0;
    used = vector<bool>(N, false);
    reverse(all(vs));
    for (int u : vs) if (!used[u]) rdfs(u, k++);

    K = k;
  }

  /* K * K の隣接グラフ */
  vector<vector<int>>
  dag() {
    vector<vector<int>> d(K, vector<int>(K, 0));

    rep (u, N) {
      int u2 = cmp[u];
      for (int v : arc[u]) {
        int v2 = cmp[v];
        if (u2 != v2) d[cmp[u]][cmp[v]] = 1;
      }
    }

    return d;
  }

};
