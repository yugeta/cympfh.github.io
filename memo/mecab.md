# MeCab using UTF-8

## インストール

### ダウンロード

必要なファイルは MeCab 本体と、そのための辞書  
辞書には複数種類があるが、IPA辞書が推奨とされている

[Downloads - mecab - Japanese morphological analyzer - Google Project Hosting](https://code.google.com/p/mecab/downloads/list)

こちらのページから

- [mecab-0.996.tar.gz](https://code.google.com/p/mecab/downloads/detail?name=mecab-0.996.tar.gz&can=2&q=)
- [mecab-ipadic-2.7.0-20070801.tar.gz](https://code.google.com/p/mecab/downloads/detail?name=mecab-ipadic-2.7.0-20070801.tar.gz&can=2&q=)

の2つをダウンロードする  
数字(バージョン) は 2015/03/14 現在の最新  
また、Windowsにはバイナリ (*.exe) が用意されている  
以下、LinuxまたはMacOSで文字コードをUTF-8に縛って利用するためのビルド方法を書く

### cd mecab-0.996

MeCab本体のインストールを行う

```bash
$ ./configure --with-charset=utf8 --enable-utf8-only
$ sudo make install
```

辞書がない状態でmecabを起動するとこうなる

```
$ mecab
param.cpp(69) [ifs] no such file or directory: /usr/local/lib/mecab/dic/ipadic/dicrc
```

### cd mecab-ipadic-2.7.0-20070801

次にMeCabで利用するための辞書をインストールする

```bash
$ ./configure --with-charset=utf8
$ sudo ldconfig
$ sudo make install
```

### 試用

正しくインストールされたか見てみる

```bash
$ mecab <<< "こんにちわ"
こんにちわ      感動詞,*,*,*,*,*,こんにちわ,コンニチワ,コンニチワ
EOS
```

「こんにちわ」は感動詞である。

## オプション

`man` 見ても何かあんまり説明が足りてない  
次のサイトは大変詳細に書いてある  

- [MeCabのコマンドライン引数一覧とその実行例 | mwSoft](http://www.mwsoft.jp/programming/munou/mecab_command.html)

### 制約付き解析 (部分解析) `-p`

辞書に無いが品詞が既知な語や、
その箇所のそこだけこの品詞にしたい。

```
mecab <<< '彼女はせもぽぬめと呼ばれている'
彼女    名詞,代名詞,一般,*,*,*,彼女,カノジョ,カノジョ
は      助詞,係助詞,*,*,*,*,は,ハ,ワ
せ      動詞,自立,*,*,サ変・スル,未然ヌ接続,する,セ,セ
も      助詞,係助詞,*,*,*,*,も,モ,モ
ぽ      形容詞,接尾,*,*,形容詞・アウオ段,ガル接続,ぽい,ポ,ポ
ぬ      助動詞,*,*,*,特殊・ヌ,基本形,ぬ,ヌ,ヌ
め      名詞,一般,*,*,*,*,め,メ,メ
と      助詞,格助詞,引用,*,*,*,と,ト,ト
呼ば    動詞,自立,*,*,五段・バ行,未然形,呼ぶ,ヨバ,ヨバ
れ      動詞,接尾,*,*,一段,連用形,れる,レ,レ
て      助詞,接続助詞,*,*,*,*,て,テ,テ
いる    動詞,非自立,*,*,一段,基本形,いる,イル,イル
EOS
```

入力を
`s/せもぽぬめ/\nせもぽぬめ\t名詞\n/g`
と置換する

```
mecab -p <<< '彼女は
せもぽぬめ      名詞
と呼ばれている
EOS'
彼女    名詞,代名詞,一般,*,*,*,彼女,カノジョ,カノジョ
は      助詞,係助詞,*,*,*,*,は,ハ,ワ
せもぽぬめ      名詞,一般,*,*,*,*,*
と      助詞,格助詞,引用,*,*,*,と,ト,ト
呼ば    動詞,自立,*,*,五段・バ行,未然形,呼ぶ,ヨバ,ヨバ
れ      動詞,接尾,*,*,一段,連用形,れる,レ,レ
て      助詞,接続助詞,*,*,*,*,て,テ,テ
いる    動詞,非自立,*,*,一段,基本形,いる,イル,イル
EOS
```

ただし、「せもぽぬめ」が複数出現する場合  
そのたびに上のような置換を行わなければならない

小さい辞書をテキストで書いて追加に使うにはどうしたら良いんだろう？
