// ------------------- UI
//
var help =
"command: 行頭からコロン(:)のイチ文字手前までを入力してエンター\n\
help:\n\
　これ\n\
show:\n\
　諸々の情報の表示\n\
　羊の後ろの * はそれが凍結されてることを示す。\n\
[card]:\n\
　カードを用いる。[card]は括弧内に表示される。\n\
　例えば '産めよ(bear)' ならば 'bear' がそれ。\n\
　ただし引数を取るものもある。manを使うこと。\n\
man [card]:\n\
　man bear のように。\n\
unzip [n]:\n\
　何(n)匹羊かで指定して、凍ってるのを一枚見つけたら解凍する\n\
"
  ;

function evaluate(str) {

  if (str === 'show') {
    return show();
  }
  if (str === 'help') {
    return help;
  }

  var vs = str.split(' ');

  // use?
  var card = findByName(vs[0]);
  if (card) {
    try {
      return card.use(vs.slice(1));
    } catch (e) {
      return e.toString();
    }
  }

  // man?
  card = findByName(vs[1]);
  if (card) {
    return card.man;
  }

  return '';
}

function findByName (name) {
  for (var i in Card) {
    if (Card[i].command === name) {
      return Card[i];
    }
  }
  return false;
}

function show() {
  var ret = '';
  ret += 'enemy: ' + sheep_enemy.map(function(s) { return s.number }).join(', ') + '\n'; 
  ret +=
    'ours: ' +
    sheep_ours.map(function(s) {
      var n = s.number + '';
      if (s.frozen) n += '*';
      return n;
    }).join(', ') + '\n'; 
  ret += 'remain sheep cards:\n';
  for (var i in sheep_stack)
    ret += '　[' + i + ']: ' + sheep_stack[i] + '枚';
    ret += '\n';
  ret += 'hands: ' + hand.map(function(c) { return c.name + '(' + c.command + ')' }).join(', ');
  return ret;
}

// ------------------------------- init

function sheep(n) {
  return {number: n, frozen: false}
}

function shuffle(ls) {
  return ls.map(function(x){return [x, Math.random()]})
           .sort(function(a,b){return a[1]-b[1]})
           .map(function(a){return a[0]})
}

var Card = {
    Umeyo :
      { name: "産めよ"
      , command: "bear"
      , man: "自分の羊カードを一枚複製する。複製する羊カード(1,3,10,30,100,300,1000) を一つ、引数にする。\nexample:\n> bear 1"
      }
  , Fuyaseyo:
      { name: "増やせよ"
      , command: "add"
      , man: "3羊を得る。"}
  , Chinimichiyo:
      { name: "地に満ちよ"
      , command: "fill"
      , man: "1羊を任意枚数得る。枚数を引数にする。多すぎるか足りなかったらできるだけにする。\nexample:\n> fill 5"
      }
  , Hanei:
      { name: "繁栄"
      , command: "bluete"
      , man: "持ってる羊カードを一枚引数で指定せよ。その一つ下のランクを3枚得る。\nexample:\n> bluete 3"
      }
  , Ougonnohidume:
      { name: "黄金の蹄"
      , command: "gold"
      , man: "持ってる羊カードを一枚引数で指定せよ。その一つ上のランクと交換する。\nexample:\n> gold 1"}
  , Tosotsu:
      { name: "統率"
      , command: "command"
      , man: "持ってる任意枚の羊を引数に指定。和を超えない中で一番大きな一枚と交換する。\nexample:\n> command 1 1 1"
      }
  , Rakuseki:
      { name: "落石"
      , command: "rock"}
  , Rakurai:
      { name: "落雷"
      , command: "thunder" }
  , Okami:
      { name: "狼"
      , command: "wolf" }
  , Ekibyo:
      { name: "疫病"
      , command: "epidemic" }
  , Kamitsu:
      { name: "過密"
      , command: "crowd" }
  , Teki:
      { name: "敵"
      , command: "enemy"
      , man: "敵が100追加される。"}
  , Bokuyoken:
      { name: "牧羊犬"
      , command: "shepherd" }
  , Firehitsuji:
      { name: "ファイア羊"
      , command: "fire" }
  , Dash:
      { name: "ダッシュ"
      , command: "dash" }
  , Reikan:
      { name: "霊感"
      , command: "inspiration" }
  , Bokyo:
      { name: "望郷"
      , command: "homesick" }
  , Kaku:
      { name: "核"
      , command: "nuclear" }
  , Toketsu:
      { name: "凍結"
      , command: "freeze" }
  , Bannou:
      { name: "万能羊"
      , command: "almight" }
}

var sheep_enemy = [sheep(100)]
  , sheep_ours  = [sheep(1)]

  , sheep_stack = {
        1   :  9
      , 3   : 10
      , 10  : 10
      , 30  : 10
      , 100 :  9
      , 300 : 10
      , 1000: 10
  }

  , stack = shuffle([
            Card.Umeyo, Card.Umeyo
          , Card.Fuyaseyo
          , Card.Chinimichiyo
          , Card.Hanei
          , Card.Ougonnohidume
          , Card.Tosotsu
          , Card.Rakuseki
          , Card.Rakurai
          , Card.Okami
          , Card.Ekibyo
          , Card.Kamitsu
          , Card.Teki, Card.Teki, Card.Teki, Card.Teki, Card.Teki
          , Card.Bokuyoken
          , Card.Firehitsuji
          , Card.Dash
          , Card.Reikan
          , Card.Bokyo
          , Card.Kaku
          , Card.Toketsu
          , Card.Bannou
          ])

  , hand = []
  ;

function draw() {
  var n = 5 - hand.length;
  if (n <= 0) return;
  hand = hand.concat(stack.slice(0, n));
  stack = stack.slice(n);
}

(function init() {
  draw();
}());

// ----------------------- カード効果

function isOwnSheep(n) {
  var i, len = sheep_ours.length;
  for (i=0; i<len; ++i) {
    if (sheep_ours[i].number === n) {
      return true;
    }
  }
  return false;
}

function int(x) { return x | 0; }

function num2idx(n) { return [1, 3, 10,30,100,300,1000].indexOf(n); }

function include(ls, sheeps) {
  var own = [0,0,0,0,0,0,0];
  for (var i=0; i<sheep_ours.length; ++i) {
    if (sheep_ours[i].frozen) continue;
    var idx = num2idx(sheep_ours[i].number);
    own[idx]++;
  }
  for (var i=0; i<ls.length; ++i) {
    var idx = num2idx(ls[i]);
    if (idx === -1) throw new Error('持ってないものを指定した' + ls[i]);
    own[idx]--;
  }
  for (var i=0; i<6; ++i) {
    if (own[i] < 0) return false;
  }
  return true;
}

function diff(sheeps, ls) {
  var ret = [];
  for (var i=0; i<sheeps.length; ++i) {
    var s = sheeps[i];
    if (s.frozen) { ret.push(s); }
    else {
      var idx = ls.indexOf(s.number);
      if (idx > -1) {
        ls = ls.slice(0, idx).concat(ls.slice(idx + 1));
      } else {
        ret.push(s);
      }
    }
  }
  return ret;
}

Card.Umeyo.use = function(args) {
  var n = +args[0];
  if (isOwnSheep(n)) {
    if (sheep_stack[n] > 0) {
      if (sheep_ours.length >= 7) {
        throw new Error("ひつじゾーンは一杯");
      } else {
        // do
        sheep_stack[n]--;
        sheep_ours.push(sheep(n));
        return n + "羊が産まれた";
      }
    } else {
      throw new Error(n + "羊は場に残ってない");
    }
  } else {
    throw new Error(n + "羊は持ってない");
  }
}

Card.Teki.use = function() {
  var i, n;
  var sum = 100;
  var ret = [];

  for (i=0; i<sheep_enemy.length; ++i) {
    n = sheep_enemy[i].number;
    sum += n;
    sheep_stack[n]++;
  }
  var return_message = '敵は' + sum;

  var ls = [1000, 300, 100, 30, 10, 3, 1];
  for (i=0; i<ls.length; ++i) {
    n = ls[i];
    var m = Math.min(Math.floor(sum / n), sheep_stack[n]);
    sum = sum - m * n;
    sheep_stack[n] -= m;
    for (var j=0; j<m; ++j)
      ret.push(sheep(n));
  }
  sheep_enemy = ret;
  return return_message;
}

Card.Fuyaseyo.use = function() {
  if (sheep_stack[3] <= 0)
    throw new Error('3羊がもういない');
  if (sheep_ours.length >= 7)
    throw new Error('羊ゾーンが一杯');

  sheep_stack[3]--;
  sheep_ours.push(sheep(3));
  return '3羊が増えた';
};

Card.Chinimichiyo.use = function(ls) {
  var n = +ls[0]
    , m = 0;
  while (n > 0 && sheep_ours.length < 7 && sheep_stack[1] > 0) {
    --n;
    ++m;
    sheep_stack[1]--;
    sheep_ours.push(sheep(1));
  }
  return m + '枚の1羊を得た';
};

Card.Hanei.use = function(ls) {
  var n = +ls[0]
    , sub = {1000: 300, 300: 100, 100: 30, 30: 10, 10: 3, 3: 1}
    ;
  if (!(n in sub))
    throw new Error('一個ランク下というのが無いみたい');
  if (!isOwnSheep(n))
    throw new Error(n + '羊を持ってない');

  n = sub[n];
  for (var i=0; i<3; ++i) {
    if (sheep_ours.length < 7 && sheep_stack[n] > 0) {
      sheep_stack[n]--;
      sheep_ours.push(sheep(n));
    }
  }
  return (i+1) + '枚の' + n + '羊を得た';
};

Card.Ougonnohidume.use = function(ls) {
  var n = +ls[0]
    , sup = {1: 3, 3: 10, 10: 30, 30: 100, 100: 300, 300: 1000};
  if (!(n in sup))
    throw new Error('一つ上のランクというものが無いみたい');
  if (!isOwnSheep(n))
    throw new Error(n + '羊を持ってない');

  var m = sup[n];
  sheep_stack[n]++;
  sheep_stack[m]--;
  for (var i=0; i<sheep_ours.length; ++i) {
    if (sheep_ours[i].number === n && sheep_ours[i].frozen === false) {
      sheep_ours[i].number = m;
    }
  }
  return 'from ' + n + ' to ' + m;
}

Card.Tosotsu.use = function(ls) {
  ls = ls.map(int);
  if (! include(ls, sheep_ours)) {
    throw new Error('そんなに持ってない');
  }
  var sum = ls.reduce(function(x,y){return x+y});
  var n = sum >= 1000 ? 1000
        : sum >=  300 ? 300
        : sum >=  100 ? 100
        : sum >= 30 ? 30
        : sum >= 10 ? 10
        : sum >= 3 ? 3 : 1;

  sheep_ours = diff(sheep_ours, ls);
  for (var i=0; i<ls.length; ++i) {
    sheep_stack[ls[i]]++;
  }

  var sub = {1000: 300, 300: 100, 100: 30, 30: 10, 10: 3, 3: 1}
  while (sheep_stack[n] <= 0) {
    n = sub[n];
  }
  sheep_stack[n]--;
  sheep_ours.push(sheep(n));
  return n + 'を得た';
};
