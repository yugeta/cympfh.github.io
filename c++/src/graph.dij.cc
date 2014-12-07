/*
 * vector<int>
 * Dij(vector<vector<int>> neigh,
 *     vector<vector<int>> cost,
 *     int s)
 *
 * take:
 *    - neigh: neighbour list, neigh[u] = { v : (u, v) in E }
 *    - cost: cost table, cost[u][v] is the cost of (u, v)
 *    - s: start node
 *
 * return:
 *    - vector<int> d
 *    - d[t]: shortest distance from s to t
 */

vector<int>
Dij(vector<vector<int> >&neigh, vector<vector<int> >&cost, int s) {
  int N = neigh.size();
  vector<int> d(N, INF);
  d[s] = 0;
  queue<int> q;
  q.push(s);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : neigh[u]) {
      if (d[v] > d[u] + cost[u][v]) {
        d[v] = d[u] + cost[u][v];
        q.push(v);
      }
    }
  }
  return d;
}
