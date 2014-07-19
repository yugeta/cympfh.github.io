#include <bits/stdc++.h>
using namespace std;

#define rep2(i,n,m) for(int i=(int)(n);i<(int)(m);++i)
#define rep(i,n) rep2(i,0,n)
#define iota(i,n,b,s) for(int i=int(b);i<int(b+s*n);i+=s)

#define INF (1e9)
#define EPS (1e-9)
#define cons(a,b) (make_pair(a,b))
#define car(a) (a.first)
#define cdr(a) (a.second)
#define cadr(a) (car(cdr(a)))
#define cddr(a) (cdr(cdr(a)))
#define trace(var) cout<<">>> "<<#var<<" = "<<var<<endl;

typedef pair<int,int> P;
 
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
  return 0;
}
