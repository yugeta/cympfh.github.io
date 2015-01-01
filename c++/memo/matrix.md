# 行列

m×n行列 ($1 \le m, n$) を、

```cpp
template<typename Number>
vector<vector<Number>>(m, vector<Number>(n))
```

によって表現する。

```cpp
typedef int Number;
typedef vector<vector<Number>> Matrix;

void print_matrix(Matrix a) {
  for (auto&l : a) {
    cout << "| " << l << '|' << endl;
  }
}
```
