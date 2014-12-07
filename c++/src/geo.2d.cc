
#include <bits/stdc++.h>
using namespace std;

#define iota(i,n,b,s) for(int i=int(b);i!=int(b+s*n);i+=s)
#define range_debug(i,n,m) (n>m?(n-m+1):(m-n+1))<<n<<(n>m?-1:1)
#define range(i,n,m) iota(i,(n>m?(n-m+1):(m-n+1)),n,(n>m?-1:1))
#define rep(i,n) iota(i,n,0,1)

#define INF (1e9)
#define EPS (1e-9)
#define cons(a,b) (make_pair(a,b))
#define car(a) (a.first)
#define cdr(a) (a.second)
#define cadr(a) (car(cdr(a)))
#define cddr(a) (cdr(cdr(a)))
#define trace(var) cout<<">>> "<<#var<<" = "<<var<<endl;

typedef long long INTEGER;
typedef long double FLOAT;
typedef pair<FLOAT, FLOAT> P; // Point
typedef pair<P, P> L; // segment or line
const FLOAT PI = acos(-1);

template<class S, class T>
ostream& operator<<(ostream& os, pair<S,T> p) {
  os << '(' << car(p) << ", " << cdr(p) << ')';
  return os;
}

/* inner dot */
FLOAT dot(P&a, P&b) {
  return car(a) * car(b) + cdr(a) * cdr(b);
}
FLOAT operator*(P&a, P&b) {
  return car(a) * car(b) + cdr(a) * cdr(b);
}

/* scalar multiple */
P operator*(P&a, FLOAT c) {
  return cons(c * car(a), c * cdr(a));
}
P operator*(FLOAT c, P&a) {
  return cons(c * car(a), c * cdr(a));
}

FLOAT det(P&a, P&b) {
  return car(a) * cdr(b) - cdr(a) * car(b);
}

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

/* distance */
FLOAT Manhattan(P&a, P&b) {
  return abs(car(a) - car(b)) + abs(cdr(a) - cdr(b));
}
FLOAT Euclidean(P&a, P&b) {
  P p = a - b;
  return sqrt(pow(car(p), 2) + pow(cdr(p), 2));
}

/* equality with EPS (default: 1e-9) */
bool eq(FLOAT x, FLOAT y) {
  return abs(x - y) < EPS;
}
bool operator==(P&a, P&b) {
  return eq(car(a), car(b)) && eq(cdr(a), cdr(b));
}

int sign(FLOAT a) {
  if (eq(a, 0)) return 0;
  return a > 0 ? 1 : -1;
}

enum CCW {
  FRONT,
  BACK,
  RIGHT,
  LEFT,
  ON
};
CCW ccw(L&l, P&p) {
  P u = car(l);
  P v = cdr(l);

  P dif = p - u;
  P dir = v - u;

  if (eq(0, car(dir))) {
    if (eq(0, car(dif))) {
      FLOAT k = cdr(dif) / cdr(dir);
      if (k > 1.0) return FRONT;
      if (k < 0.0) return BACK;
      return ON;
    } else {
      if (det(dir, dif) > 0.0) {
        return LEFT;
      }
      return RIGHT;
    }
  }

  FLOAT k = car(dif) / car(dir);
  if (eq(cdr(dir) * k, cdr(dif))) {
    if (k > 1.0) return FRONT;
    if (k < 0.0) return BACK;
    return ON;
  } else {
    if (det(dir, dif) > 0.0) {
      return LEFT;
    }
    return RIGHT;
  }
}

FLOAT magnitude(P&a) {
  return sqrt(pow(car(a), 2) + pow(cdr(a), 2));
}

FLOAT arg(P&a, P&b) {
  FLOAT x = dot(a, b) / magnitude(a) / magnitude(b);
  x = min<FLOAT>(1, max<FLOAT>(-1, x));
  return acos(x);
}
