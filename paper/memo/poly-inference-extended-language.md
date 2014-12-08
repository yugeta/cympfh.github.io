# Polynomial time inference of extended regular pattern languages

- Shinohara
- Kyushu Univ.

## 要旨

空の代入を許さない正規パターン言語
(the class of extended regular pattern languages)

パターン言語とは、
パターンの変数に空でない文字列を代入して得られる文字列全ての集合のこと。
正例から消去不能正規パターン言語の族を、
多項式時間で構築することを考える。

`MINL` とは、文字列の有限集合が与えられた時に、
最小の言語 (minimal language) を計算するアルゴリズムのことで、
これを用いる。

MINL が行う計算は明らかに、最長共通部分列と関連がある。
これについても議論する。

# 導入

推論には、

- 演繹 (deductive)
- 帰納 (inductive)

の二つがある。

