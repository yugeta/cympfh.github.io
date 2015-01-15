#include <bits/stdc++.h>
using namespace std;

/* 昇順整列済み ls, 要素 x
 * ls に x が出現する回数を返す
 */

template<typename T>
int binary_count(vector<T> ls, T x) {
  const int n = ls.size();
  int left;
  int right;

  {{{ // search left
    if (ls[0] == x) {
      left = 0;
    } else {
      int l = 0;
      int r = n;
      // ls[l] < x <= ls[r]
      while (l < r) {
        if (l + 1 == r) {
          if (ls[l] == x) left = l;
          else if (ls[r] == x) left = r;
          else return 0;
          break;
        }
        int m = (l + r) / 2;
        if (ls[m] < x) {
          l = m;
        } else {
          r = m;
        }
      }
    }
  }}}

  {{{ // search right
    if (ls[n-1] == x) {
      right = n;
    } else {
      int l = 0;
      int r = n;
      // ls[l] <= x < ls[r]
      while (l < r) {
        if (l + 1 == r) {
          if (ls[l] == x) right = r;
          else if (ls[r] == x) right = r + 1;
          else return 0;
          break;
        }
        int m = (l + r) / 2;
        if (ls[m] <= x) {
          l = m;
        } else {
          r = m;
        }
      }
    }
  }}}

  return right - left;
}

int main() { // test
  
  const int N = 10;
  const int M = 100;

  for (int _ = 0; _ < N; ++_) {
    int a[M] = {0};
    vector<int> xs;
    for (int x = 0; x < M; ++x) {
      int count_of_x = rand() % 10;
      a[x] = count_of_x;
      for (int i = 0; i < count_of_x; ++i) xs.push_back(x);
    }

    for (int x = 0; x < M; ++x) {
      assert(a[x] == binary_count(xs, x));
    }
  }

  return 0;
}
