mplayer, mplayer2

# ローカルファイル(動画、音楽) の再生

$ mplayer <file>

実行中に命令を与えるには
キーを送ればいい

<Space> 再生/一時停止 (toggle)
q 終了
右クリック 再生/一時停止 (toggle)
s スクリーンショット (カレントディレクトリに適当にrenameしたpngが生成される)
<Right> 数秒次に送る
<Left> 数秒前に送る

再生速度とは、0より大きい実数で
[ 再生速度をいくらか下げる
] 再生速度をいくらか上げる
{ 再生速度をかなり下げる
} 再生速度をかなり上げる
<BackSpace> 再生速度を 1.0 にする

## 便利なオプション

初めから再生速度を与えることができて

$ mplayer -speed 1.3

再生速度を変更するとデフォルトでは周波数もそのまま変わる
たとえば再生速度を上げると高く聴こえる
次のオプションは元の周波数をできるだけ保ってくれて

$ mplayer -af scaletempo

あと今こんなのも見つけた
音声が2chの場合、一般にボーカルの音声だけを取り除くことができて

$ mplayer -af karaoke

でもほとんど使い物にはならなそう

# playlist

$ mplayer <file1> <file2> ...
$ cat pls.txt
<file1>
<file2>
$ mplayer -playlist pls.txt

<Enter> プレイリストで次のファイルの再生を開始. 次が無ければ終了

## 便利なオプション

$ mplayer -shuffle <file1> <file2> ...

# CD-ROM

$ mplayer --cd-rom /dev/cdrw1 cdda://

CD中身を全部再生する
複数トラックが入ってても一つのファイルとして扱う

Found audio CD with 4 tracks.

のようにトラック数が出力される
この場合、このCDには<track-numer>として1,2,3,4 が有効で

$ mplayer -cdrom-device /dev/cdrw1 cdda://<track-number>
$ mplayer -cdrom-device /dev/cdrw1 cdda://<track-number>-<track-number>

トラック間での移動の方法は不明

## CD からの取り込み

Banshee とかからやったほうが楽曲情報もつくし便利だと思うけど
mplayerでも一応何かしらできて

$ mplayer -cdrom-device /dev/cdrw1 cdda://3 -ao pcm:file=track3.wav -vo null -vc null
$ file track3.wav
track3.wav: RIFF (little-endian) data, WAVE audio, Microsoft PCM, 16 bit, stereo 44100 Hz

wav形式でしか分かんないから ffmpeg なりで変換

$ ffmpeg -i track3.wav track3.mp3

`-ao pcm:file=` は別にCDからじゃなくても、動画ファイルにも適応できる

# DVD

```
mplayer -speed 1.0 -dvd-device /dev/dvdrw1 dvd://
```

`dvd://`には整数値を与えることで、例えば

```
mplayer -speed 1.0 -dvd-device /dev/dvdrw1 dvd://2
```

とすることで、chapter 2 から再生

# カメラ

例えば私の使っているPCの内蔵カメラは /dev/video0 であるらしく

$ mplayer tv:// -tv device=/dev/video0
