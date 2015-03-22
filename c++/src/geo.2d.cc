#include <bits/stdc++.h>
using namespace std;

#define rep(i,n) for(int i=0;i<(n);++i)
#define loop for(;;)
#define inf (1e9)
#define eps (1e-9)
#define trace(var) cerr<<">>> "<<#var<<" = "<<var<<endl;
using Integer = long long;
using Real = long double;
using P = pair<Real, Real>;
using L = vector<P>;
const Real PI = acos(-1);

template<class S, class T> inline
ostream& operator<<(ostream&os, pair<S,T> p) {
  os << '(' << p.first << ", " << p.second << ')';
  return os;
}

template<class T> inline
ostream& operator<<(ostream&os, vector<T> v) {
  if (v.size() == 0) {
    os << "(empty)";
    return os;
  }
  os << v[0];
  for (int i=1, len=v.size(); i<len; ++i) os << ' ' << v[i];
  return os;
}

template<class T> inline
istream& operator>>(istream&is, vector<T>&v) {
  rep (i, v.size()) is >> v[i];
  return is;
}

int dx[] = { -1, 0, 1, 0 };
int dy[] = {  0, -1, 0, 1 };

/* inner dot */
Real dot(P&a, P&b) {
  return a.first * b.first + a.second * b.second;
}
Real operator*(P&a, P&b) {
  return a.first * b.first + a.second * b.second;
}

/* scalar multiple */
P operator*(P a, Real c) {
  return {c * a.first, c * a.second};
}
P operator*(Real c, P a) {
  return {c * a.first, c * a.second};
}

P operator/(P a, Real d) {
  return {a.first / d, a.second / d};
}

Real det(P a, P b) {
  return a.first * b.second - a.second * b.first;
}

/* vector operator */
P operator+(P a, P b) {
  return {a.first + b.first, a.second + b.second};
}

P operator-(P a) {
  return {-a.first, -a.second};
}

P operator-(P a, P b) {
  return {a.first - b.first, a.second - b.second};
}

/* distance */
Real Manhattan(P a, P b) {
  return abs(a.first - b.first) + abs(a.second - b.second);
}
Real Euclidean(P a, P b) {
  P p = a - b;
  return sqrt(pow(p.first, 2) + pow(p.second, 2));
}

/* equality with eps (default: 1e-9) */
bool eq(Real x, Real y) {
  return abs(x - y) < eps;
}
bool eq(P a, P b) {
  return eq(a.first, b.first) && eq(a.second, b.second);
}
bool operator==(P a, P b) {
  return eq(a.first, b.first) && eq(a.second, b.second);
}

int sign(Real a) {
  if (eq(a, 0)) return 0;
  return a > 0 ? 1 : -1;
}

Real magnitude(P&a) {
  return sqrt(pow(a.first, 2) + pow(a.second, 2));
}

Real arg(P&a, P&b) {
  Real x = dot(a, b) / magnitude(a) / magnitude(b);
  x = min<Real>(1, max<Real>(-1, x));
  return acos(x);
}

int main() {
  cin.tie(0);
  ios::sync_with_stdio(0);
  cout.setf(ios::fixed);
  cout.precision(10);
  Real a,b,c,d,e,f;

  return 0;
}
