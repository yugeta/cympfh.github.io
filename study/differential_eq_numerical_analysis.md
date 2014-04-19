% 微分方程式の数値計算
% 枚方ノート
% 2013/5/10 (Fri.) 10:32:46

\def\dt{\;\textrm{d}t}
\def\dx{\;\textrm{d}x}

# 拡散方程式

## 前進Euler

$$ u_t = \kappa u_{xx} $$

これの 前進Euler は,

\begin{eqnarray*}
    \dfrac{ u_{i, k+1} - u_{i, k} }{\dt} & = & \kappa ( u_{i+1,k} - 2 u_{i,k} + u_{i-1, k} ) \dfrac{1}{\dx^2} \\
    \iff u_{i, k+1} & = & u_{i, k} + \kappa \dt \dfrac{1}{\dx^2} ( u_{i+1}{k} - 2 u_{i, k} + u_{i-1, k} ).
\end{eqnarray*}

これを解くことを考える.

$$ u_{i, k+1} := r u_{i+1, k} + (1 - 2r) u_{i, k} + r u_{i-1, k} $$
where
$$ r := \kappa \dt \dfrac{1}{\dx^2} $$

# von Neumann の安定性解析

二次元配列$u$を次のように置く.

$$ h := \dx $$
$$ u_{j, k} := \alpha^k e^{i \beta j h} $$

    % imagin number i
    % これは、フーリエ展開した時の一成分である.

先の
$$ u_{i, k+1} := r u_{i+1, k} + (1 - 2r) u_{i, k} + r u_{i-1, k} $$
に入れると,
\begin{eqnarray*}
    \alpha & = & r e^{i \beta h} - 2r + r e^{- i \beta h} \\
           & = & 1 - 2r \cos(\beta h)
\end{eqnarray*}

$|\alpha| < 1$ のとき, $u_{j,k} (k \rightarrow \infty) \rightarrow 0 $(安定).

$|\alpha| > 1$ のとき, $u_{j,k} (k \rightarrow \infty)$ は収束しない(不安定).

ということは,
$\cos$ が$[-1, 1]$を取りうるとして、
安定の条件は、$r \le 1/2$と書き改められる.

$r$の定義は再述すると、
$$ r := \kappa \dt \dfrac{1}{\dx^2} $$

空間刻みを半分にして, 時間刻みを1/4にするとrは同じ.
時間刻みも空間刻みも半分だとrは二倍に増える.

## 後退Euler

$$ \dfrac{ u_{i,k} - u_{i,k-1} }{\dt} = \kappa ( u_{i+1,k} - 2 u_{i, k} + u_{i-1, k} ) \dfrac{1}{\dx^2} $$

を解くと,

$$ u_{i, k-1} = -r u_{i+1, k} + 2r u_{i, k} -r u_{i-1, k} $$

同様に,
$$ u := \alpha^k e^{i \beta j h} $$
と書けば、

$$ 1/\alpha = -r e^{i \beta h} + 2r - r e^{- i \beta h} $$
$$ \therefore \alpha = \dfrac{1}{ 1 + 2r ( 1 - \cos(\beta h) ) } $$

同様に, $\cos$ の取る範囲を過程すれば,
$\alpha$ の取りうる値の範囲は$[$1 / (1 + 4r)$, 1]$ となって,
常に 1 以下で安定となる (無条件安定).

# 移流方程式

$$ u_t = - c u_x ~~ (Const. c > 0) $$

## 中心差分

中心差分でこれを表すと,

$$ \dfrac{ u_{i,k+1} - u_{i,k} }{ \dt } = - c ( u_{i+1,k} - u_{i-1,k} ) \dfrac{2}{\dx} $$

やはり同様に,

$$ h := \dx $$
$$ u_{j, k} := \alpha^k e^{i \beta j h} $$

と置けば,

\begin{eqnarray*}
  \alpha  & = & 1 - \gamma ( e^{i \beta h} - e^{- i \beta h} ) \\
          & = & 1 - 2i \gamma \sin(\beta h),
\end{eqnarray*}

\begin{center}
  where $\gamma = c \dt \dfrac{2}{\dx}$.
\end{center}

複素平面上にあるんだけど，絶対値は 1 以上あるため、無条件不安定となる.
すなわち, これは使い物にならない.

移流方程式というのは,
$x$に沿って移動する何かを表してる.
すなわち、点$(x, t)$ の$u$は, 点$(x_{prev}, t)$ の $u$ で決まるのに、
中心差分は、点$(x_{next}, t)$を利用している.
だからダメだったのだ.

## 風上差分

$$ \dfrac{ u_{i, k+1} - u_{i, k} }{\dt} = -c ( u_{i, k} - u_{i-1, k} ) \dfrac{1}{\dx} $$

このとき,

$$ \alpha = 1 - \gamma ( 1 - e^{ - i \beta h } ) $$

### CFL条件 (Courant-Friedrichs-Lewy Condition)
流れが最も早いところでもCFLを満たすなら安定なのだ


