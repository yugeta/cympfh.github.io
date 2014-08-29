# Weakly Supervised User Profile Extraction from Twitter 

# Intro

Tweets of one user -> Facebook-style profile

Facebook-style profile is a list of entities e.g.

- Spout
  Education
  Job
  Interest
  Religion
  Hometown
  Living location
  Family member

この論文では

- Spout
  Education
  Job

のみについて実験を行うが、おそらく他の項目についても
今回の手法をそのまま適応できるであろう．

## weak supervise

- Facebook
  Google+
  LinkedIn

を用いてなんか「弱い」教師を作る

# Relation

過去の似たようなタスクとして

- gender -- Ciot+ 2013, Liu&Ruth 2013, Liu+2012
  age -- Rao+ 2010
  political polarity -- Pennacchiotti&Popescu 2011, Conovt+ 2011

さて問題は教師データをどう用意するかである．
例えば、性別当てを行った Ciot+ 2013 では、プロフィール画像から
手でちまちま答えを作ったという．

今回はそのようなことは行わない．
すなわち、

## Distant Supervision a.k.a. Weak Supervision


