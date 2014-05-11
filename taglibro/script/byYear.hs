import Data.Char (ord)
(|>) x f = f x; infixl 1 |>

main = do
    ls <- getContents >>= return . lines
    ls |> map (\l -> (readIt l, l))
       |> showHTML
       |> unlines
       |> putStrLn

-- read "year" part ("2012/4/31" -> 2012)
readIt :: String -> Int
readIt xs = read $ takeWhile (/= '/') xs

showHTML :: [(Int, String)] -> [String]
showHTML ls =
    showHTML' True 0 ls [] |> drop 1 |> (\ls -> ls  ++ ["</div>"])
    where
      showHTML' _ _ [] ac = reverse ac
      showHTML' b prev ((m, l) : rest) ac =
        showHTML' b' m rest ac'
          where link = "<a href=\"./" ++ l ++ ".html\">" ++ label l ++ "</a>"
                b' = if prev < m then not b else b
                ac' = if prev < m then link : ("<div class=" ++ className b ++ ">") : "</div>" : ac
                                  else link : ac
                label = init . init . init -- drop the last ".md"

className True = "black"
className False = "red"
