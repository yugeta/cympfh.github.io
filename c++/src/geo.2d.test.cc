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

  assert(eq(static_cast<Real>(1.0),
            static_cast<Real>(1.0 + EPS/2.0)));

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

