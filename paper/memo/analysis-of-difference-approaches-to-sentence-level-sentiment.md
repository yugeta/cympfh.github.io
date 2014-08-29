# 読む論文

- title: Analysis of different approaches to Sentence-Level Sentiment Classification
- author: V. S. Jagtap, Karishma Pawar
- file: paper11.pdf
- date: 1 April 2013

# Abst

sentiment classification at a fine-grained level
つまり
文章のレベルで pos/neg/neu を附ける手法の紹介

# Intro

NLPで極性分析はわりと新しく、word, phrase, sentence, doc レベルなどでなされる。
あと、学習方法も、ナイーブなり、最大エントロピーなり、SVMなりある。

main task は、ドキュメントレベルの極性分析。

sentence-level の極性分析は、
1 sentence には 1 opnion だけ含まれると仮定して、
subjectivity classification と sentiment classification
の2つを行う。

# Approaches

## machine learning approach

- naive Bayes, SVM, ME

一番良いのは SVM with accuracy 82.9 %
(700 pos reviews and 700 neg reviews and 3-fold cross validation)

具体的にどう学習したか。bag-of-featuresです。

    features = [f1 .. fn]
    d <- document
    return $ map (\f -> n f d) features
        where n = \f d -> count f in d

この素性ベクタでなんか学習すんだって。

## Semantic Orientation Approach

pos and neg sentiment words and phrases (Liu, 2007)

### corpus-based

### dictionary-based

- synonyms
- antonyms
- hierarchies

in WordNet 

