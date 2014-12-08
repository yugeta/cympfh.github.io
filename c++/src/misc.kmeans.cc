#include <iostream>
#include <stack>
#include <cmath>
#include <vector>
using namespace std;

#define iota(i,n,b,s) for(int i=int(b);i!=int((b)+(s)*(n));i+=(s))
#define range(i,n,m) iota(i,(((n)>(m))?((n)-(m)+1):((m)-(n)+1)),(n),((n)>(m)?-1:1))
#define rep(i,n) iota(i,(n),0,1)

#define INF (1e9)
#define EPS (1e-9)
#define cons(a,b) (make_pair(a,b))
#define car(a) (a.first)
#define cdr(a) (a.second)
#define cadr(a) (car(cdr(a)))
#define cddr(a) (cdr(cdr(a)))
#define all(a) a.begin(), a.end()
#define trace(var) cerr<<">>> "<<#var<<" = "<<var<<endl;

template<class S, class T>
ostream& operator<<(ostream& os, pair<S,T> p) {
  os << '(' << car(p) << ", " << cdr(p) << ')';
  return os;
}

template<class T>
ostream& operator<<(ostream& os, vector<T> v) {
  os << v[0];
  for (int i=1, len=v.size(); i<len; ++i) os << ' ' << v[i];
  return os;
}

typedef double FLOAT;
typedef pair<FLOAT, FLOAT> P;

/*
 * k-means
 *
 * return vector<int>ids;
 * ids[i] is the cluster ID of ps[i]
 */

/* vector operator */
P operator+(P&a, P&b) {
    return cons(car(a) + car(b), cdr(a) + cdr(b));
}
P operator-(P&a) {
    return cons(-car(a), -cdr(a));
}

P operator-(P&a, P&b) {
    return cons(car(a) - car(b), cdr(a) - cdr(b));
}

FLOAT Euclidean(P&a, P&b) {
  P p = a - b;
  return sqrt(pow(car(p), 2) + pow(cdr(p), 2));
}

vector<int>
kmeans(int cluster_N, vector<P>&ps, int iterator_N = 20) {
  int len = ps.size();
  vector<int> ids(len);

  vector<P> ms(cluster_N);
  rep (i, cluster_N) ms[i] = ps[i * len / cluster_N];

  rep (i, iterator_N) {
    cerr << "iterate: " << i << endl;
    vector<P> sum(cluster_N, P(0, 0)); // sum[j] は id j のクラスタの和
    vector<int> cod(cluster_N, 0); // id j のクラスタの濃度

    // ps[j] と ms[n] の比較
    rep (j, len) {
      int id = -1;
      FLOAT min_d = INF;
      rep (n, cluster_N) {
        FLOAT d = Euclidean(ps[j], ms[n]);
        if (min_d > d) {
          min_d = d;
          id = n;
        }
      }
      ids[j] = id;
      sum[id] = sum[id] + ps[j];
      cod[id]++;
    }

    // update
    rep (n, cluster_N) {
      if (cod[n] == 0) {
        // fuck
        ms[n] = ps[rand() % len];
      } else {
        // means
        P total = sum[n];
        ms[n] = P(car(total) / cod[n], cdr(total) / cod[n]);
      }
    }
  }

  return ids;
}

const int M = 10;
FLOAT gaussian_gen() {
  const int mu = 10;
  FLOAT x = 0;
  rep (j, M) x += FLOAT((rand() % (mu * 2)) - mu);
  x /= M;
  return x;
}

int main() {

  /*
   * Point ps[j] has class ts[j]
   */
  vector<P> ps; // seq of point
  vector<int> ts; // seq of class

  const int N = 100;
  rep (i, N) {
    int klass = rand() % 3;
    FLOAT x = gaussian_gen();
    FLOAT y = gaussian_gen();

    // give klass by its mean
    switch (klass) {
      case 0:
        break;
      case 1:
        x += 10;
        y += 10;
        break;
      case 2:
        x += 5;
        y += 5;
        break;
    }
    ps.push_back(P(x, y));
    ts.push_back(klass);
  }

  auto result = kmeans(3, ps);

  /*
   * IDは違うので、単純に比較はできない。
   */
  cerr << ts << endl;
  cerr << result << endl;

  return 0;
}
