/*
 * (W * H - 1) パズル (a.k.a 15パズル)
 * を解く最小手数を求めます
 *
 * これは
 * http://indeednow-quala.contest.atcoder.jp/tasks/indeednow_2015_quala_4
 * の解答です
 *
 * 24手数以内であることが保証されており、
 * この解答は双方向探索を行います
 *
 */

#include <bits/stdc++.h>
using namespace std;

#define rep(i,n) for(int i=0;i<(n);++i)
#define loop for(;;)
#define trace(var) cerr<<">>> "<<#var<<" = "<<var<<endl;
const double PI = acos(-1);

template<class S, class T>
ostream& operator<<(ostream& os, pair<S,T> p) {
  os << '(' << p.first << ", " << p.second << ')';
  return os;
}

template<class T>
ostream& operator<<(ostream& os, vector<T> v) {
  if (v.size() == 0) {
    os << "(empty)";
    return os;
  }
  os << v[0];
  for (int i=1, len=v.size(); i<len; ++i) os << ' ' << v[i];
  return os;
}

int h, w;
int area;

vector<vector<int> > step(vector<int>&s) {
  vector<vector<int>> ret;
  rep (idx, area) {
    if (s[idx] == 0) {
      // trace(s);
      int i = idx / w;
      int j = idx % w;
      if (i > 0) {
        // trace("up");
        vector<int> t(area);
        rep (i, area) t[i] = s[i];
        t[idx] = t[idx - w];
        t[idx - w] = 0;
        ret.push_back(t);
      }
      if (i < h-1) {
        vector<int> t(area);
        rep (i, area) t[i] = s[i];
        t[idx] = t[idx + w];
        t[idx + w] = 0;
        ret.push_back(t);
      }
      if (j > 0) {
        // trace("left");
        vector<int> t(area);
        rep (i, area) t[i] = s[i];
        t[idx] = t[idx - 1];
        t[idx - 1] = 0;
        ret.push_back(t);
      }
      if (j < w-1) {
        // trace("right");
        vector<int> t(area);
        rep (i, area) t[i] = s[i];
        t[idx] = t[idx + 1];
        t[idx + 1] = 0;
        ret.push_back(t);
      }
    }
  }
  return ret;
}

map<vector<int>, int> table;
map<vector<int>, int> r_table;

int main() {
  cin.tie(0);
  ios::sync_with_stdio(0);
  cout.setf(ios::fixed);
  cout.precision(10);
  cin >> h >> w;
  area = h * w;

  vector<int> s(area);
  rep (i, area) cin >> s[i];
  vector<int> g(area);
  rep (i, area) g[i] = (i + 1) % area;

  queue<tuple<int, vector<int>, bool>> q;
  q.push(make_tuple(0, s, true));
  q.push(make_tuple(0, g, false));
  table[s] = 0;
  r_table[g] = 0;

  int ans = -1;
  int cx = 0;
  while (!q.empty()) {
    auto tup = q.front(); q.pop();
    int depth = get<0>(tup);
    auto&s = get<1>(tup);
    bool dir = get<2>(tup);
    if (depth > 12) continue;

    /*
    if (cx++ % 100 == 0) {
      trace(depth);
      trace(dir);trace(s);
    }
    */

    if (dir) {
      if (r_table.count(s) > 0) {
        ans = depth + r_table[s];
        break;
      }
    } else {
      if (table.count(s) > 0) {
        ans = depth + table[s];
        break;
      }
    }

    auto ss = step(s);
    for (auto&s: ss) {
      if (dir) {
        if (table.count(s) > 0) continue;
        table[s] = depth + 1;
      }
      if (not dir) {
        if (r_table.count(s) > 0) continue;
        r_table[s] = depth + 1;
      }
      q.push(make_tuple(depth + 1, s, dir));
    }
  }
  cout << ans << endl;
  return 0;
}

/*
 * 入力例1
3 3
1 0 2
4 5 3
7 8 6

ゴールとなる状態は

1 2 3
4 5 6
7 8 0

であるので、解答は

3

*/

/*
 * 入力例2
3 5
6 1 2 8 5
7 0 4 3 10
11 12 13 9 14

解答は

12

*/
