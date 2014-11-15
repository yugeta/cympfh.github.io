#!/bin/bash

for f in ../memo/*.md; do
  id=${f%.md}
  id=${id##*/}
  echo $id
  mecab $f | grep '名詞,' | awk '{print $1}' > nouns/${id}.txt
done
