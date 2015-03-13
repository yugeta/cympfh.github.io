# MeCab using UTF-8

## インストール

### ダウンロード

必要なファイルは MeCab 本体と、そのための辞書。
辞書には複数種類があるが、標準はIPA辞書。

[Downloads - mecab - Japanese morphological analyzer - Google Project Hosting](https://code.google.com/p/mecab/downloads/list)

こちらのページから

- mecab-0.996.tar.gz
- mecab-ipadic-2.7.0-20070801.tar.gz

の2つをダウンロード。
数字(バージョン) は 2015/03/14 現在の最新。

### cd mecab-0.996

```bash
mecab-0.996 $ ./configure --with-charset=utf8 --enable-utf8-only
sudo make install
```

辞書がない状態でmecabを起動するとこうなる
```bash
$ mecab
param.cpp(69) [ifs] no such file or directory: /usr/local/lib/mecab/dic/ipadic/dicrc
```

### cd mecab-ipadic-2.7.0-20070801

```bash
$ ./configure --with-charset=utf8
$ sudo ldconfig
$ sudo make install
```

## 試用

```bash
$ mecab <<< "こんにちわ"
こんにちわ      感動詞,*,*,*,*,*,こんにちわ,コンニチワ,コンニチワ
EOS
```

「こんにちわ」は感動詞である。

## オプション

`man` 見ても何かあんまり説明が足りてない。
次のサイトは大変詳細に書いてある。

- [MeCabのコマンドライン引数一覧とその実行例 | mwSoft](http://www.mwsoft.jp/programming/munou/mecab_command.html)

### 制約付き解析 (部分解析) `-p`

辞書に無いが品詞が既知な語や、
その箇所のそこだけこの品詞にしたい。

```bash
$ mecab <<< "彼はすぽぽんぬだ"
彼      名詞,代名詞,一般,*,*,*,彼,カレ,カレ
は      助詞,係助詞,*,*,*,*,は,ハ,ワ
す      動詞,自立,*,*,サ変・スル,文語基本形,する,ス,ス
ぽ      形容詞,接尾,*,*,形容詞・アウオ段,ガル接続,ぽい,ポ,ポ
ぽん    副詞,助詞類接続,*,*,*,*,ぽん,ポン,ポン
ぬ      助動詞,*,*,*,特殊・ヌ,基本形,ぬ,ヌ,ヌ
だ      助動詞,*,*,*,特殊・ダ,基本形,だ,ダ,ダ
EOS
```

```bash
$ mecab -p <<< '彼は
すぽぽんぬ      名詞
だ
EOS'
彼      名詞,代名詞,一般,*,*,*,彼,カレ,カレ
は      助詞,係助詞,*,*,*,*,は,ハ,ワ
すぽぽんぬ      名詞,一般,*,*,*,*,*
だ      助動詞,*,*,*,特殊・ダ,基本形,だ,ダ,ダ
EOS
```

ただし、「すぽぽんぬ」が複数出現する場合、
そのたびに上のように

`s/すぽぽんぬ/\nすぽぽんぬ\t名詞\n/g`

と置換する必要がある。

小さい辞書をテキストで書いて追加に使うにはどうしたら良いんだろう？
