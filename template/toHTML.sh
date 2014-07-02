LIST="cpp haskell javascript ocaml"
for l in $LIST; do
  echo "\`\`\`$l" > /tmp/hoge.md
  cat "$l.txt" >> /tmp/hoge.md
  echo "\`\`\`" >> /tmp/hoge.md
  pandoc -s -i /tmp/hoge.md -o "./$l.html"
done
