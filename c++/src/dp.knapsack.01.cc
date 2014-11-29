/*
 * 0-1 knapsack problem
 *
 * Knapsack problem - Wikipedia
 * http://en.wikipedia.org/wiki/Knapsack_problem
 *
 * solve with DP of cost
 * O(N * C)
 *
 * where
 *   N is the number of variety
 *   C is the total capacity
 */

#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

#define iota(i,n,b,s) for(int i=int(b);i!=int((b)+(s)*(n));i+=(s))
#define range(i,n,m) iota(i,(((n)>(m))?((n)-(m)+1):((m)-(n)+1)),(n),((n)>(m)?-1:1))
#define rep(i,n) iota(i,(n),0,1)

void debug(int*ar, int size) {
  cerr << ar[0];
  for (int i=1; i<size; ++i) {
    cerr << ' ' << ar[i];
  }
  cerr << endl;
}

template<class T>
ostream& operator<<(ostream& os, vector<T> v) {
  os << v[0];
  for (int i=1, len=v.size(); i<len; ++i) os << ' ' << v[i];
  return os;
}

void solve(istream&);

int main(){

  /*
   * number-of-variety (N)
   * capacity (C)
   * i-th-cost i-th-value (c[i], v[i])
   */

  stringstream sample1("\
6\n\
10\n\
3 70\n\
2 40\n\
2 80\n\
5 90\n\
1 30\n\
1 50");

  solve(sample1);

  return 0;
}

void
solve(istream&is) {
  int N, C;
  is >> N >> C;

  int c[N], v[N];

  rep (i, N) {
    is >> c[i];
    is >> v[i];
  }

  // DP of cost
  int dp[C+1];
  vector<vector<int>> detail(C+1, {});

  rep (k, C+1) dp[k] = 0;

  rep (i, N) {
    range (k, C-c[i], 0) {
      int k2 = k + c[i];
      if (dp[k2] < dp[k] + v[i]) {
        dp[k2] = dp[k] + v[i];
        detail[k2] = detail[k];
        detail[k2].push_back(i);
      }
    }
    debug(dp, C+1);
  }
  cout << dp[C] << endl;
  cout << "内訳: " << detail[C] << endl;
}
