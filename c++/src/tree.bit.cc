/* BIT for v[0] .. v[N - 1]
 *
 * bit = BIT(N);
 *
 * bit.add(n, x) = { v[n] += x; }
 * bit.sum_up(n) = v[0] + v[1] + .. + v[n]
 *
 */

struct BIT {
  int N;
  int *ar;
  BIT(int n) {
    N = n;
    ar = new int[n+1];
    for(int i=0;i<n+1;ar[i++]=0);
  }
  ~BIT() {
    delete[] ar;
  }
  void add(int idx, int w) {
    for (int x = idx+1; x <= N; x += x&-x) {
      ar[x] += w;
    }
  }
  int sum_up(int idx) {
    int ret = 0;
    for (int x = idx + 1; x > 0; x -= x&-x) {
      ret += ar[x];
    }
    return ret;
  }
};

int main() {
  auto bit = BIT(100);
  bit.add(0, 1);
  cout << bit.sum_up(0) << endl;
  bit.add(1, 1);
  bit.add(3, 1);
  cout << bit.sum_up(0) << endl;
  cout << bit.sum_up(2) << endl;
  cout << bit.sum_up(3) << endl;
  return 0;
}
