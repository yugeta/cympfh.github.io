#include <bits/stdc++.h>
#include <sstream>
using namespace std;

#define iota(i,n,b,s) for(int i=int(b);i!=int((b)+(s)*(n));i+=(s))
#define range(i,n,m) iota(i,(((n)>(m))?((n)-(m)+1):((m)-(n)+1)),(n),((n)>(m)?-1:1))
#define rep(i,n) iota(i,(n),0,1)

#define INF (1e9)

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

int solve(istream& ss) {
  int n, m; ss >> n >> m;
  int s, t; ss >> s >> t;
  --s; --t;
  vector<vector<int>> neigh(n);
  vector<vector<int>> cost(n, vector<int>(n));
  rep (i, m) {
    int a, b, c;
    ss >> a >> b >> c;
    --a; --b;
    neigh[a].push_back(b);
    cost[a][b] = c;
    cost[b][a] = c;
  }
  return Dij(neigh, cost, s)[t];
}

int main() {

  stringstream input1("\
      3 3\n\
      1 2\n\
      1 3 3\n\
      3 2 3\n\
      1 2 1");
  int output1 = 1;
  assert(solve(input1) == output1);

  stringstream input2("\
      5 6\n\
      1 5\n\
      1 2 10\n\
      1 3 25\n\
      1 4 15\n\
      2 4 10\n\
      3 5 20\n\
      4 5 20");
  int output2 = 35;
  assert(solve(input2) == output2);

  stringstream input3("\
      5 6\n\
      1 5\n\
      1 2 200\n\
      1 4 400\n\
      1 3 250\n\
      2 4 100\n\
      4 5 150\n\
      3 5 300");
  int output3 = 450;
  assert(solve(input3) == output3);

}
