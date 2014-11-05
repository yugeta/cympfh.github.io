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

typedef pair<int,int> P;
typedef vector<int> vi;
 
int dx[4] = {-1,0,1,0};
int dy[4] = {0,1,0,-1};

template<class S, class T>
ostream& operator<<(ostream& os, pair<S,T> p) {
  os << '(' << car(p) << ", " << cdr(p) << ')';
  return os;
}
template<class T>
ostream& operator<<(ostream& os, vector<T> v) {
  os << "(vector";
  for (int i=0, len=v.size(); i<len; ++i) os << ' ' << v[i];
  os << ')';
  return os;
}

int main() {
  int n; cin >> n;

  rep(i,10) cout << i << ' '; cout << endl;
  range(i,-10, 10) cout << i << ' '; cout << endl;
  range(i,0, 0) cout << i << ' '; cout << endl;
  range(i,10, -10) cout << i << ' '; cout << endl;

  return 0;
}
