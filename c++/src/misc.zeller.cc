enum Day {
  Sat = 0,
  Sun = 1,
  Mon, Tue, Wed, Thu, Fri
};

Day
zeller(int y, int m, int d) {
  int Y = y % 100;
  int c = int(y/100);
  int gamma = -2 * c + int(c/4); // Gregorian (1582 <= y)
  //int gamma = -c + 5; // Julian (4 <= y <= 1582)
  int h = d + int(26 * (m+1) / 10)
    + Y + int(Y/4) + gamma;
  h %= 7;
  return Day(h);
}

int main() {
  cout << (Fri == zeller(2014, 11,28)) << endl;
  cout << (Tue == zeller(1990, 11, 6)) << endl;
  return 0;
}
