- `import`
- `list2ids`
- `removed`
- `rm_chk_pls`

---

## import

```bash
./import [playlist] [url]
or
./import [playlist] [id]
```

This add-write `id title` to the `playlist`.

example.

```bash
./import ../pls/fav.pls https://www.youtube.com/watch?v=ayplyZzN3mc
```

In the above example.

```haskell
playst = ../pls/fav.pls
url = https://www.youtube.com/watch?v=ayplyZzN3mc
id = ayplyZzN3mc
title = "Bassmicrobe - Hanahaodori [Japanese DNB]"
```

## list2ids

```bash
./list2ids [playlist-id]
```

From playlist created by user,
this filters the movie ids.

The playlist is e.g.
`https://www.youtube.com/watch?v=wP3_tJ0bYMo&list=PL9C0CF1866DC91476`

and these playlist-id is `PL9C0CF1866DC91476`

However,
this playlist is created automaticaly by YouTube system.

`https://www.youtube.com/watch?v=bww1xBSaKZU&list=RDbww1xBSaKZU`


`list2ids`
see the page
`https://www.youtube.com/playlist?list=[playlist-id]`.
The page for the previous playlist (by YouTube) are not there.
So this will fail.

## removed

```bash
./removed [url]
or
./removed [id]
```

This check the movie is removed or not.

```
./removed dJkKfmtzC3I
0
# this movie you can see

./removed yE96sq9vzFg
1
# we cannot watch this forever
```

## `rm_chk_pls`

apply the previous `removed` to a playlist file

```bash
./rm_chk_pls [playlist]
```

