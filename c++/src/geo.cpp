#include <bits/stdc++.h>

using namespace std;

#define INF (1e9)
#define EPS (1e-9)
#define cons(a,b) (make_pair(a,b))
#define car(a) (a.first)
#define cdr(a) (a.second)

typedef long double FLOAT;
typedef pair<FLOAT, FLOAT> P; // Point
typedef pair<P, P> L; // segment or line
const FLOAT PI = acos(-1);

template<class S, class T>
ostream& operator<<(ostream& os, pair<S,T> p) {
  os << '(' << car(p) << ", " << cdr(p) << ')';
  return os;
}

// inner dot
FLOAT dot(P&a, P&b) {
  return car(a) * car(b) + cdr(a) * cdr(b);
}
FLOAT operator*(P&a, P&b) {
  return car(a) * car(b) + cdr(a) * cdr(b);
}

FLOAT det(P&a, P&b) {
  return car(a) * cdr(b) - cdr(a) * car(b);
}

// vector operator
P operator+(P&a, P&b) {
  return cons(car(a) + car(b), cdr(a) + cdr(b));
}

P operator-(P&a) {
  return cons(-car(a), -cdr(a));
}

P operator-(P&a, P&b) {
  return cons(car(a) - car(b), cdr(a) - cdr(b));
}

// distance
FLOAT Manhattan(P&a, P&b) {
  return abs(car(a) - car(b)) + abs(cdr(a) - cdr(b));
}
FLOAT Euclidean(P&a, P&b) {
  P p = a - b;
  return sqrt(pow(car(p), 2) + pow(cdr(p), 2));
}

// equality with EPS (default: 1e-9)
bool eq(FLOAT x, FLOAT y) {
  return abs(x - y) < EPS;
}
bool operator==(P&a, P&b) {
  return eq(car(a), car(b)) && eq(cdr(a), cdr(b));
  //return (car(a) == car(b)) && (cdr(a) == cdr(b));
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

int main() {

  P a(1,2);
  P b(2,3);

  cout << "two points (or vector): "
    << a << ", " << b << endl;

  // basic operation
  //
  assert((a + b) == P(3, 5));
  assert((a - b) == P(-1, -1));
  assert((-a) == P(-1, -2));
  assert(dot(a, b) == 8.0);

  // equality
  //
  assert(a != b);

  P c(0.999999999L, 1.999999999L);
  assert(a != c);

  assert(eq(static_cast<FLOAT>(1.0),
            static_cast<FLOAT>(1.0 + EPS/2.0)));

  P d(0.99999999999L, 1.99999999999L);
  assert(a == d);

  // CCW
  //
  P u(0, 0), v(1, 1);
  L line(u, v);

  P x1(1,0);
  P x2(0,1);
  P x3(2,2);
  P x4(0.5, 0.5);
  P x5(-1, -1);

  assert(ccw(line, x1) == RIGHT);
  assert(ccw(line, x2) == LEFT);
  assert(ccw(line, x3) == FRONT);
  assert(ccw(line, x4) == ON);
  assert(ccw(line, x5) == BACK);

  // NOTE
  assert(ccw(line, u) == ON);
  assert(ccw(line, v) == ON);

  // arg
  //
  assert(eq(arg(x1, x2), PI/2));
  assert(eq(arg(x3, x5), PI));
  assert(eq(arg(v, x3), 0));
  assert(eq(arg(x1, x3), PI/4));

  // distance
  a = P(0, 0),
  b = P(1, 1);
  assert(eq(Manhattan(a, b), 2.0));
  assert(eq(Euclidean(a, b), sqrt(2.0)));

  return 0;
}
