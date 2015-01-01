/*
 * 定義通りの行列式
 * O(n * n!)
 */

typedef int Number;
typedef vector<vector<Number>> Matrix;

Number naiiv_det(Matrix a) {
  const int n = a.size();
  assert(a[0].size() == n);

  vector<int> pi(n);
  for (int i=0; i<n; ++i) pi[i] = i;

  Number d = 0;
  int sign = 0;
  do {
    sign = (sign + 1) % 4;
    Number prod = 1;
    for (int j=0; j<n; ++j) prod *= a[j][pi[j]];
    d += (sign < 2 ? 1 : -1) * prod;
  } while (next_permutation(pi.begin(), pi.end()));

  return d;
}
