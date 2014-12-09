/*
 * 線分 [p1, p2] と、[p3, p4] との交差判定
 *
 * ちょうど乗ってる場合は、`false`にしちゃってるので註意
 */

bool inter(P p1, P p2, P p3, P p4) {

  P p12 = p1 - p2;
  P p31 = p3 - p1;
  P p41 = p4 - p1;
  P p34 = p3 - p4;
  P p23 = p2 - p3;

  Real f1 = car(p12) * cdr(p31) - cdr(p12) * car(p31);
  Real f2 = car(p12) * cdr(p41) - cdr(p12) * car(p41);

  if (f1 * f2 >= 0) return false;

  Real f3 = - car(p34) * cdr(p31) + cdr(p34) * car(p31);
  Real f4 = car(p34) * cdr(p23) - cdr(p34) * car(p23);

  if (f3 * f4 >= 0) return false;

  return true;
}
