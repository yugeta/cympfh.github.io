#include <bits/stdc++.h>
using namespace std;

#define rep2(i,n,m) for(int i=(int)(n);i<(int)(m);++i)
#define rep(i,n) rep2(i,0,n)

#define INF (1e9)
#define EPS (1e-9)
#define car(a) (a.first)
#define cdr(a) (a.second)
#define cadr(a) (car(cdr(a)))
#define cddr(a) (cdr(cdr(a)))
#define trace(var) cout<<">>> "<<#var<<" = "<<var<<endl;

typedef pair<int,int> P;
 
int dx[4] = {-1,0,1,0};
int dy[4] = {0,1,0,-1};

template<class S, class T>
ostream& operator<<(ostream& os, pair<S,T> p) {
    os << '(' << car(p) << ", " << cdr(p) << ')';
      return os;
}
template<class T>
ostream& operator<<(ostream& os, vector<T> v) {
    os << "(vector";
      for (int i=0, len=v.size(); i<len; ++i) os << ' ' << v[i];
        os << ')';
          return os;
}

/* ------------------------------------------
 * Warshall-Floyd
 *
 * works on O(V^3)
 *
 * V is the number of vertexes
 *
 * d[i][j] is the cost of (i -> j)
 * INF means no edge
 *
 */

#define MAX_V 1000

int V;
int d[MAX_V][MAX_V];

void wall() {
  rep(i, V) d[i][i] = 0;
  rep(k, V) rep(i, V) rep(j, V)
    d[i][j] = min(d[i][j], d[i][k] + d[j][k]);
}

// -------------------------------------------

void add_edge(int u, int v, int c) { // undirected edge
  d[u][v] = c;
  d[v][u] = c;
}

inline
string sig(int c) {
  if (c == INF) return string("INF");
  stringstream ss;
  ss << setw(3);
  ss << c;
  return ss.str();
}

int main() {
  V = 7;
  rep(i,V) rep(j,V) d[i][j] = INF;
  add_edge(0, 1, 2);
  add_edge(0, 2, 5);
  add_edge(1, 2, 4);
  add_edge(1, 3, 6);
  add_edge(2, 3, 2);
  add_edge(1, 4, 10);
  add_edge(3, 5, 1);
  add_edge(4, 5, 3);
  add_edge(4, 6, 5);
  add_edge(5, 6, 9);

  rep(i, V) {
    rep(j, V) cout << sig(d[i][j]) << " ";
    cout << endl;
  }

  wall();
  cout << endl;

  rep(i, V) {
    rep(j, V) cout << sig(d[i][j]) << " ";
    cout << endl;
  }

  return 0;
}

/*
INF   2   5 INF INF INF INF
  2 INF   4   6  10 INF INF
  5   4 INF   2 INF INF INF
INF   6   2 INF INF   1 INF
INF  10 INF INF INF   3   5
INF INF INF   1   3 INF   9
INF INF INF INF   5   9 INF

  0   2   5   7  11   8  16
  2   0   4   6  10   7  15
  5   4   0   2   6   3  11
  7   6   2   0   4   1   9
 11  10   6   4   0   3   5
  8   7   3   1   3   0   8
 16  15  11   9   5   8   0
*/
