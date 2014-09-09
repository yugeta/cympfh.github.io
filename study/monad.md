# モナド

## 参考文献
1. King, David J., and Philip Wadler. "Combining monads." Functional Programming, Glasgow 1992. Springer London, 1993. 134-143.
[Combining Monads](homepages.inf.ed.ac.uk/wadler/papers/monadscomb/monadscomb.ps)

## Monad

リストモナドを想像して、それの一般形がモナドだと思うことにする

```haskell
map :: (a -> b) -> [a] -> [b]
map f [x, ...] = [f x, ...]

unit :: a -> [a]
unit x = [x]

join :: [[a]] -> [a]
join = concat
```

`unit`は`return`という名前であることもある．
数学的には単位元になってるからunit.
Haskellとかプログラミング言語では一旦外の世界に返すものだから`return`.

これの一般、とは `[a]` を `M a` という型で書いたものに過ぎない

```haskell
map :: (a -> b) -> M a -> M b
unit :: a -> M a
join :: M (M a) -> M a
```

リストモナドなら 次の7つ が成立することはよく見れば分かる．
逆に、次の7つが成り立つことがモナドであることの条件としよう

ただしドットは関数結合

- (M-1) `map id == id`
- (M-2) `map (f . g)     == map f . map g`
- (M-3) `map f . unit    == unit . f`
- (M-4) `map f . join    == join . map (map f)`
- (M-5) `join . unit     == id`
- (M-6) `join . map unit == id`
- (M-7) `join . map join == join . join`

`M-1`, `M-2` は `map` が `functor` であることを言う
`M-3` は `unit` が、`M-4` では `join` が自然変換であることを言う
`M-5`, `M-6` は よくわからない．
別に `unit` や `(map unit)` が `join` の逆関数というわけではない
まあ、`join`に右からかけると逆数になってるものが2つあるということ
`M-7` は `join` の結合法則

## Comprehension

さて、リストの内包表記があるように一般のモナドについて内包というものを考えられる．
Wadler の表記を借りる. 
(mc-1)にだけ目を瞑ればHaskellのリスト内包表記と実際同じである.

Lambda は空を表すシンボル.
次の3つを定義する

- (mc-1) `[t | Lambda] = unit t`
- (mc-2) `[t | x <- u] = map (\x -> t) u`
- (mc-3) `[t | p1 .. pn, q]   = join [[t | q] | p1 .. pn]`

具体例としてやはりリストモナドを用いれば

```haskell
[ f x | x <- [1,2,3]] = map (\x -> f x) [1,2,3] = [f 1, f 2, f 3]

[(x,y)| x <- [1,2], y <- [3,4]] = join [[(x,y) | y <- [3,4]] | x <- [1,2]]
                                = join [ map (\y -> (x,y)) [3,4] | x <- [1,2]]
                                = join (map (\x -> map (\y -> (x,y)) [3,4]) [1,2])
                                = ...
                                = [(1,3), (1,4), (2,3), (2,4)]
```

`(mc-3)` の `p`, `q` の展開順序によって次のような記述が可能なわけである

```haskell
[x | xs <- ls, x <- xs]

=> join [[x | x <- xs] | xs <- ls] -- (mc-3)
=> join [(map (\x -> x) xs) | xs <- ls] -- (mc-2)
=> join [xs | xs <- ls] -- 評価
=> join (map (\xs -> xs) ls) -- (mc-2)
=> join ls -- 評価
```

`ls` として `[[1,2], [3,4]]` を与えれば

```haskell
join [[1,2], [3,4]]
= [1,2,3,4]
```

つまるところ join とは concat である，ってどっかに書いたかな？

### 内包表記について当然成り立って欲しい性質

以下が成り立つことが確かめられる．

- (mc-4) [f t | p]    == map f [t | p]
- (mc-5) [x | x <- u] == u
- (mc-6) [t | p, x <- [u|q], r] == [t' | p, q, r'] (t', r' は t, r におけるxという文字をu という文字に書き換えたもの)

### リストに対する補助関数

```haskell
-- append
(++) :: [a] -> [a] -> [a]
[x, ...] ++ [y, ...] = [x, ..., y, ...]

-- 畳み込み

fold :: (a -> a -> a) -> a -> [a] -> a
fold f e []  = e
fold f e [x] = x
fold f e (a++b) = f (fold f e a) (fold f e b)
```

such that

```haskell
fold f e xs = fold f e (xs ++ [])
            = fold f e xs  `f` e
```

e は f の単位元であること．つまり

```haskell
  f e x = f x e = x
```

を要請する.

また、

```haskell
fold f e [x,y,z] = fold f e [x,y] `f` z
                 = f (f x y) z
fold f e [x,y,z] = x `f` fold f e [y,z]
                 = f x (f y z)
```

従って、fの結合則

```haskell
  f (f x y) z = f x (f y z)
```

これもまた要請される

この (++), fold で map と join が再定義できる

```haskell
map f []  = []
map f [x] = [f x]
map f (a++b) = (map f a) ++ (map f b)
```

まあ、引数パターンに(++)使っていいのかしらんけど

```haskell
join = fold (++) []
```

コレは簡潔でいいな

ええと、リストに対する関数 `h` が次のように3つの引数パターンで書けたとする

```haskell
h :: [a] -> b
h [] = e
h [x] = g x
h (xs ++ ys) = (h xs) <*> (h ys)
  where
  e :: b
  g x :: a -> b
  <*> :: b -> b -> b
```

`h = fold <*> e . map g`
と書ける時、 h はhomomorphism (準同型) である、という．(何と準同型?)

## M [] というモノイド

リストモナド [] に、モナド `M` を組み合わせる

```haskell
(@) :: M [a] -> M [a] -> M [a]
a @ b = [x ++ y | x <- a, y <- b]
```

a, b から取り出す x, y というのがリスト [a] で、その append を `M` に包んで返す
右辺全体の [] はリストじゃなくて、`M`についての内包表記であることに注意

この演算子 `(@)` について次の3つが成り立ちます．
`unit` とか `map` とか `join` が
リストではなくて、`M`についての演算であることに注意

- (@-1) `unit a @ unit b == unit (a ++ b)`
- (@-2) `map f a @ map f b == map f (a @ b)`
- (@-3) `join (f a) @ join (f b) == join (f (a @ b))`

`fold` はリスト `[a]` の中身 `a` を取り出す

```haskell
prod :: [M [a]] -> M [a]
prod = fold @ e
```

これによって `M[]` というモナドの `unit`, `map`, `join` が定義できる.
どのモナドにおけるそれらか、ちゃんと書くことにしよう

```haskell
unit^(M[]) = unit^M . unit^[]
map^(M[])  = map^M . map^[]
join^(M[]) = join^M . map^M prod
```
