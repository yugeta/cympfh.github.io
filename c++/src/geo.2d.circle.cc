struct C {
  P o;
  Real r;
  C(P o, Real r) : o(o), r(r) {}
  C(Real x, Real y, Real r) : o(cons(x, y)), r(r) {}
};
