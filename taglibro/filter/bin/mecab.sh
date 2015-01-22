#!/bin/bash

# 2015 以下だけハッシュする
for f in ../2015/*/*.md; do
  dir=${f%/*}
  dir=${dir#../}
  p=${f##*/}
  test -d nouns/$dir || mkdir -p nouns/$dir
  mecab $f | grep '名詞,' | awk '{print $1}' > nouns/$dir/${p%md}txt
done
