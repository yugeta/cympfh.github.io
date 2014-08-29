## Structured models for fine-to-coarse sentiment analysis.
McDonald, Ryan, et al.
"Structured models for fine-to-coarse sentiment analysis."
Annual Meeting-Association For Computational Linguistics. Vol. 45. No. 1. 2007.

# 感情分析の為のレベル
* document level (Pang et al., 2002)
* sentence level (Pang and Lee, 2004; Mao and Lebanon, 2006)
* phrase level (Turney, 2002; Choi et al., 2005)
* the speaker level in debates (Thomas et al., 2006)

# fine-to-coarse sentiment analysis
document全体の感情分析及び それよりも下のレベルでの感情分析を行う

<code>document &gt; paragraph &gt; sentence &gt; phrase &gt; word</code>

それぞれのレベルで独立の感情分析を行なっても大抵上手くいかない
それは文脈によって良くも悪くも解釈できる語があるから

<code>My 11 year old daughter has also been using it and it is a lot <b>harder</b> than it looks.</code>

---

感情分析における共通の現象

* 段落の極性分析は最後の文ほど信用できる
    このようなパターンを自然と学習させたい

* ネガティブな文章にもポジティブな文はでてくる

# A Sentence-Document Models
nの文からなる1つのdocument に対して

n+1 の感情分析を行う

---

入力 <img src="1.png">
出力 <img src="2.png">
出力はラベル
<img src="3.png">

---

<img src="fig1.png">
(本論文より引用)

隣接は依存関係を表す

y<sup>d</sup> は y<sup>s</sup><sub>1</sub> ...  y<sup>s</sup><sub>n</sub> に
y<sup>s</sup><sub>i</sub> は y<sup>d</sup> と y<sup>s</sup><sub>i-1</sub>， y<sup>s</sup><sub>i+1</sub> に
依存する

---

この関係を学習できればよい

* CRF
* linear classifiers (Collins, 2002) (本論文で使われた方)

---

入力 s に対してラベル y が付与される尤度
<img src="4.png">
<img src="5.png">

---


学習: MIRA学習アルゴリズム

推定: y<sup>d</sup> に対してビタビアルゴリズム <img height="50px" src=6.png style="display:inline;position:relative;top:10px;">

---

# Beyond Two-Level Models
先ほどの Sentence-Document model は容易に拡張できる
<img src="./fig4.png">
例えば y<sup>p</sup><sub>i</sub> は y<sup>d</sup>, y<sup>p</sup><sub>i-1</sub>, y<sup>p</sup><sub>i+1</sub>, y<sup>s</sup><sub>i</sub> に依存する

推定は straight-forward bottom-up で計算する

---

# 実験
Amazonのレビューについて重複，不完全な文，スパムを取り除いたものについて実験をした

<code>構成する文について :: Pos / Neg / Neu
レビュー全体について :: Pos / Neg</code>

このようにアノテートしたデータによって訓練する (10-fold cross validation)

---

# Baselines

* Document-Classfier
* Sentence-Classfier
* Sentence-Structured
    提案手法の学習から y<sup>d</sup> を除いたもの

* Cascaded Sentence &rarr; Document
    sentence に対する sentence-structured の出力を入力に document を分類

* Cascaded Document &rarr; Sentence
    document に対する document-classfier の出力を入力に追加して sentence を分類

---

# Result
<img src="./tab2.png">
