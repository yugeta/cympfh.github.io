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

  if (str === 'r') {
    location.reload();
    return 'reload';
  }
  if (str === 'show' || str === 'ls') {
    return show();
  }
  if (str === 'help') {
    return help;
  }
  if (str.indexOf('unzip') === 0) {
    var n = str.split(' ');
    if (n.length < 2) throw new Error('誤った構文');
    n = n[1] | 0;
    unzip(n);
    return 'success';
  }

  var vs = str.split(' ');

  // use?
  var card = findByName(vs[0]);
  if (card) {
    try {

      if (!hasHand(card)) throw new Error(card.name + 'を持ってない');
      var ret = card.use(vs.slice(1));
      while (hand.length < 5 && stack.length > 0) {
        hand.push(stack.shift());
      }
      if (hand.length + stack.length === 0) {
        return "カードが無くなった。あなたの負け";
      }
      return ret;

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

function hasHand(card) {
  for (var i=0; i<hand.length; ++i)
    if (hand[i].name === card.name) return true;
  return false;
}

function hasHandByCommandName(cn) {
  for (var i=0; i<hand.length; ++i)
    if (hand[i].command === cn) return true;
  return false;
}

function removeHand(card) {
  var i;
  for (i=0; i<hand.length; ++i)
    if (hand[i].name === card.name) break;
  hand = hand.slice(0, i).concat(hand.slice(i+1));
}

function discard(card) {
  removeHand(card);
  gomi.push(card);
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
  ret += 'deck: ' + stack.length + ' 枚\n'
  ret += 'remain sheep cards:\n';
  for (var i in sheep_stack)
    ret += '　[' + i + ']: ' + sheep_stack[i] + '枚';
    ret += '\n';
  ret +=
    'hands: ' +
    hand.map(function(c) {
              return c.name + '(' + c.command + ')'
            }).join(', ');
  return ret;
}

// ------------------------------- init

function sheep(n) { return {number: n, frozen: false} }

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
      , command: "rock"
      , man: "持ってる羊を一枚、引数に指定。それを捨てる\nexample:\n> rock 1"}
  , Rakurai:
      { name: "落雷"
      , command: "thunder"
      , man: "持ってる中で最大の羊を一枚、失う"}
  , Okami:
      { name: "狼"
      , command: "wolf"
      , man: "持ってるn枚から同様に確からしい確率で1枚失う"}
  , Ekibyo:
      { name: "疫病"
      , command: "epi"
      , man: "持ってる羊を一つ引数で指定。その数の羊をすべて捨てる。"}
  , Kamitsu:
      { name: "過密"
      , command: "crowd"
      , man: "残りが2枚以下になるように捨てる羊を引数に指定。\nexample:\n> crowd 1 1 3"}
  , Teki:
      { name: "敵"
      , command: "enemy"
      , man: "敵が100追加される。"}
  , Bokuyoken:
      { name: "牧羊犬"
      , command: "shepherd"
      , man: "イベントカードを引数に指定。これを一枚捨てる。\nexample:\n> shepherd wolf"}
  , Firehitsuji:
      { name: "ファイア羊"
      , command: "fire" 
      , man: "手札にあるイベントカードを引数に指定。これと使用したファイア羊を除外する。\nexample:\n> fire enemy"}
  , Dash:
      { name: "ダッシュ"
      , command: "dash"
      , man: "イベントカードを二枚、引数に指定。それらを山札の一番下に置く\nexample:\n> dash enemy thunder"}
  , Reikan:
      { name: "霊感"
      , command: "inspire"
      , man: "引きたいイベントカードを一枚、指定。手札に加えて山札はシャッフルされる。\nexample:\n> inspire command\n選ぶために山札を見るには、次のコマンドを実行。\n> inspire list"}
  , Bokyo:
      { name: "望郷"
      , command: "home"
      , man: "敵の羊を100増やす。捨てたイベントカードをすべて山札に加えてシャッフル。"}
  , Kaku:
      { name: "核"
      , command: "nuclear"
      , man: "使用した核と、山札を除外"}
  , Toketsu:
      { name: "凍結"
      , command: "freeze"
      , man: "羊を一枚、引数に指定。凍結されてないものがあれば、凍結する。(hint: unzip)"}
  , Bannou:
      { name: "万能羊"
      , command: "almight"
      , man: "持っているイベントカードを一枚、引数に指定。そのイベントカードとしてこれを使用する。コピーされたイベントカードへの引数を後続させる。\nexample:\n> almight bear 3\nalmightをbearにコピーして、bear 3 を実行させた"}
};

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
  , gomi = []
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

function unzip(n) {
  for (var i=0; i < sheep_ours.length; ++i) {
    if (sheep_ours[i].number === n && sheep_ours[i].frozen) {
      sheep_ours[i].frozen = false;
      return;
    }
  }
}

function isOwnSheep(n) {
  var i, len = sheep_ours.length;
  for (i=0; i<len; ++i) {
    if (sheep_ours[i].number === n && sheep_ours[i].frozen === false) {
      return true;
    }
  }
  return false;
}

function removeOurSheep(n) {
  var i, len = sheep_ours.length;
  for (i=0; i<len; ++i) {
    if (sheep_ours[i].frozen === false && sheep_ours[i].number === n) {
      break;
    }
  }
  sheep_ours = sheep_ours.slice(0, i).concat(sheep_ours.slice(i + 1));
  return sheep_ours;
}

function removeAllOurSheep(n) {
  var i, len = sheep_ours.length;
  var ls = [], ret = 0;
  for (i=0; i<len; ++i) {
    if (sheep_ours[i].frozen || sheep_ours[i].number !== n) {
      ls.push(sheep_ours[i]);
    }
    else ++ret;
  }
  sheep_ours = ls;
  return ret;
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

function unfrozenSize(sheeps) {
  var len = 0;
  for (var i=0; i < sheeps.length; ++i) {
    if (sheeps[i].frozen) continue;
    else ++len;
  }
  return len;
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

        discard(Card.Umeyo);
        return n + "羊が産まれた";
      }
    } else {
      throw new Error(n + "羊は場に残ってない");
    }
  } else {
    throw new Error(n + "羊は持ってない");
  }
}

function increaseEnemy() {
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

Card.Teki.use = function() {
  var return_message = increaseEnemy();
  discard(Card.Teki);
  return return_message;
}

Card.Fuyaseyo.use = function() {
  if (sheep_stack[3] <= 0)
    throw new Error('3羊がもういない');
  if (sheep_ours.length >= 7)
    throw new Error('羊ゾーンが一杯');

  sheep_stack[3]--;
  sheep_ours.push(sheep(3));

  discard(Card.Fuyaseyo);
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

  discard(Card.Chinimichiyo);
  return m + '枚の1羊を得た';
};

Card.Hanei.use = function(ls) {
  var n = +ls[0]
    , sub = {1000: 300, 300: 100, 100: 30, 30: 10, 10: 3, 3: 1}
    ;

  if (unfrozenSize(sheep_ours) === 0) {
    discard(Card.Hanei);
    return '羊がいない';
  }

  if (n === 1) {
    removeOurSheep(1);
    sheep_stack[1]++;
    discard(Card.Hanei);
    return '1羊をなくした';
  }

  if (!(n in sub))
    throw new Error('一個ランク下というのが無いみたい');
  if (!isOwnSheep(n))
    throw new Error(n + '羊を持ってない');

  removeOurSheep(n);
  sheep_stack[n]++;

  n = sub[n];
  for (var i=0; i<3; ++i) {
    if (sheep_ours.length < 7 && sheep_stack[n] > 0) {
      sheep_stack[n]--;
      sheep_ours.push(sheep(n));
    }
  }
  discard(Card.Hanei);
  return (i) + '枚の' + n + '羊を得た';
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
      break;
    }
  }
  discard(Card.Ougonnohidume);
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

  removeOurSheep(Card.Tosotsu);

  discard(Card.Tosotsu);
  return n + 'を得た';
};

Card.Rakuseki.use = function(ls) {

  if (unfrozenSize(sheep_ours) === 0) {
    discard(Card.Rakuseki);
    return '羊を持ってない';
  }

  var n = int(ls[0]);
  if (! isOwnSheep(n)) throw new Error('持ってない');
  removeOurSheep(n);
  sheep_stack[n]++;

  discard(Card.Rakuseki);
  return n + '羊が失くなった';
};

Card.Rakurai.use = function() {

  if (unfrozenSize(sheep_ours) === 0) {
    discard(Card.Rakurai);
    return '羊を持ってない';
  }

  var m = -1;
  for (var i=0; i<sheep_ours.length; ++i) {
    var n = sheep_ours[i].number;
    if (sheep_ours[i].frozen) return;
    if (m < n) {
      m = n;
    }
  }
  removeOurSheep(m);
  sheep_stack[m]++;

  discard(Card.Rakurai);
  return m + '羊が失くなった';
};

Card.Okami.use = function() {

  if (unfrozenSize(sheep_ours) === 0) {
    discard(Card.Okami);
    return '捨てられる羊がいない';
  }

  var idx;
  for (;;) {
    idx = Math.random() * sheep_ours.length | 0;
    if (sheep_ours[idx].frozen) continue;
    break;
  }
  var n = sheep_ours[idx].number;
  removeOurSheep(n);
  ++sheep_stack[n];

  discard(Card.Okami);
  return n + '羊が失くなった';
};

Card.Ekibyo.use = function(ls) {
  var n = int(ls[0]);
  if (! isOwnSheep(n))
    throw new Error(n + '羊は持ってない');

  var m = removeAllOurSheep(n);
  sheep_stack[n] += m;

  discard(Card.Ekibyo);
  return n + '羊が' + m + '枚、失くなった';
};

Card.Kamitsu.use = function(ls) {
  ls = ls.map(int);
  var backup = sheep_ours.map(function(x){return x});
  ls.forEach(function(i) {
    removeOurSheep(i);
  });

  if (sheep_ours.length <= 2) {
    ls.forEach(function(i) { sheep_stack[i]++; });
    discard(Card.Kamitsu);
    return 'success';
  }
  else {
    sheep_ours = backup;
    throw new Error('足りない');
  }
};

Card.Bokuyoken.use = function(ls) {
  var name = ls[0];

  if (hand.length === 0) {
    discard(Card.Bokuyoken);
    return '捨てるものがない';
  }
  if (!hasHandByCommandName(name))
      throw new Error(name + 'を持ってない');

  discard(Card.Bokuyoken);
  discard(findByName(name));

  return 'success';
};

Card.Firehitsuji.use = function(ls) {
  var name = ls[0];

  if (hand.length === 1) {
    discard(Card.Firehitsuji);
    return '捨てるものがない';
  }
  if (!hasHandByCommandName(name))
      throw new Error(name + 'を持ってない');

  removeHand(Card.Firehitsuji);
  removeHand(findByName(name));

  return 'success';
};

Card.Dash.use = function(ls) {

  var n = Math.min(2, hand.length - 1);
  if (ls.length < n) {
    throw new Error('指定するイベントカードは' + n + '枚');
  }

  ls.forEach(function(name) {
    if (! hasHandByCommandName(name)) {
      throw new Error(name + 'は持ってないみたい');
    }
    if (name === 'dash') {
      throw new Error('cannot dash self');
    }
  });

  ls.forEach(function(name) {
    var card = findByName(name);
    removeHand(card);
    stack.push(card);
  });

  discard(Card.Dash);
  return 'success';

};

Card.Reikan.use = function(ls) {

  if (ls[0] === 'list') {
    return stack.map(function(x){return x.name + '(' + x.command + ')' }).join(', ');
  }

  else {
    var name = ls[0];

    for (var i=0; i<stack.length; ++i) {
      if (stack[i].command === name) {
        var card = stack[i];
        stack = stack.slice(0, i).concat(stack.slice(i+1));
        stack = shuffle(stack);
        hand.push(card);
        discard(Card.Reikan);
        return 'gotten ' + card.name ;
      }
    }
    throw new Error(name + 'は無い');
  }
};

Card.Bokyo.use = function(ls) {
  increaseEnemy(100);
  stack = stack.concat(gomi);
  stack = shuffle(stack);
  gomi = [];

  discard(Card.Bokyo);
  return 'success';
};

Card.Kaku.use = function(ls) {
  removeHand(Card.Kaku);
  stack = [];
  return 'success';
};

Card.Toketsu.use = function(ls) {
  var n = int(ls[0]);
  for (var i=0; i < sheep_ours.length; ++i) {
    if (sheep_ours[i].frozen === false && sheep_ours[i].number === n) {
      sheep_ours[i].frozen = true;
      break;
    }
  }
  discard(Card.Toketsu);
  return 'success';
};

Card.Bannou.use = function(ls) {
  var name = ls[0];
  if (hasHandByCommandName(name) && findByName(name)) {
    var card = findByName(name);
    discard(Card.Bannou);
    var ret = card.use(ls.slice(1));
    hand.push(card);
    gomi.pop();
    return ret;
  }
  throw new Error('持ってないか存在しないか');
};
