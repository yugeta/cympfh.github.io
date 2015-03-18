
  cout << "# rotate to left" << endl;
  vector<int> xs = {1,2,3,4};
  cout << xs << endl; // 1 2 3 4
  rotate(begin(xs), begin(xs) + 1, end(xs));
  cout << xs << endl; // 2 3 4 1
  rotate(begin(xs), begin(xs) + 1, end(xs));
  cout << xs << endl; // 3 4 1 2

  cout << "# rotate to right" << endl;
  vector<int> ys = {1,2,3,4};
  cout << ys << endl; // 1 2 3 4
  rotate(begin(ys), end(ys) - 1, end(ys));
  cout << ys << endl; // 4 1 2 3
  rotate(begin(ys), end(ys) - 1, end(ys));
  cout << ys << endl; // 3 4 1 2

  cout << "# string rotate" << endl;
  string s = "abcd";
  cout << s << endl; // abcd
  rotate(begin(s), end(s) - 1, end(s));
  cout << s << endl; // dabc

