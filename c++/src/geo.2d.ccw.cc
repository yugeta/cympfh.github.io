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
      Real k = cdr(dif) / cdr(dir);
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

  Real k = car(dif) / car(dir);
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
