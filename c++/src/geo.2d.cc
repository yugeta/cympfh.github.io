#include <bits/stdc++.h>
using namespace std;

#define iota(i,n,b,s) for(int i=int(b);i!=int((b)+(s)*(n));i+=(s))
#define range(i,n,m) iota(i,(((n)>(m))?((n)-(m)):((m)-(n))),(n),((n)>(m)?-1:1))
#define rep(i,n) iota(i,(n),0,1)
#define loop for(;;)

#define INF (1e9)
#define EPS (1e-9)
#define cons(a,b) (make_pair(a,b))
#define car(a) (a.first)
#define cdr(a) (a.second)
#define cadr(a) (car(cdr(a)))
#define cddr(a) (cdr(cdr(a)))
#define all(a) a.begin(), a.end()
#define trace(var) cerr<<">>> "<<#var<<" = "<<var<<endl;

typedef long long Integer;
typedef long double Real;
typedef vector<int> vi;
typedef vector<string> vs;
typedef map<string,int> Dictionary;
typedef pair<Real, Real> P; // Point
typedef pair<P, P> L; // segment or line
const Real PI = acos(-1);

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

int dx[] = { -1, 0, 1, 0 };
int dy[] = {  0, -1, 0, 1 };

/* inner dot */
Real dot(P&a, P&b) {
  return car(a) * car(b) + cdr(a) * cdr(b);
}
Real operator*(P&a, P&b) {
  return car(a) * car(b) + cdr(a) * cdr(b);
}

/* scalar multiple */
P operator*(P a, Real c) {
  return cons(c * car(a), c * cdr(a));
}
P operator*(Real c, P a) {
  return cons(c * car(a), c * cdr(a));
}

P operator/(P a, Real d) {
  return cons(car(a) / d, cdr(a) / d);
}

Real det(P a, P b) {
  return car(a) * cdr(b) - cdr(a) * car(b);
}

/* vector operator */
P operator+(P a, P b) {
  return cons(car(a) + car(b), cdr(a) + cdr(b));
}

P operator-(P a) {
  return cons(-car(a), -cdr(a));
}

P operator-(P a, P b) {
  return cons(car(a) - car(b), cdr(a) - cdr(b));
}

/* distance */
Real Manhattan(P a, P b) {
  return abs(car(a) - car(b)) + abs(cdr(a) - cdr(b));
}
Real Euclidean(P a, P b) {
  P p = a - b;
  return sqrt(pow(car(p), 2) + pow(cdr(p), 2));
}

/* equality with EPS (default: 1e-9) */
bool eq(Real x, Real y) {
  return abs(x - y) < EPS;
}
bool operator==(P a, P b) {
  return eq(car(a), car(b)) && eq(cdr(a), cdr(b));
}

int sign(Real a) {
  if (eq(a, 0)) return 0;
  return a > 0 ? 1 : -1;
}

Real magnitude(P&a) {
  return sqrt(pow(car(a), 2) + pow(cdr(a), 2));
}

Real arg(P&a, P&b) {
  Real x = dot(a, b) / magnitude(a) / magnitude(b);
  x = min<Real>(1, max<Real>(-1, x));
  return acos(x);
}
