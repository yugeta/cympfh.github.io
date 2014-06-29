% Sample Slides
% Hirakata
% \today

# OK

The frame title always begins with #.
This means first-class title or &lt;H1&gt;.

When using more sub (&lt;H2&gt;, ##),
take care not insert paragraph between &lt;H1&gt; and &lt;H2&gt;.

# itemize

ordered

1. one
1. two

un-ordered

- black
- white

The true beamer has more expression such as
```tex
\item<2->
```
to display item at delay,
but
i don't know how to write that in (pandoc-)markdown.


# image

![the Vim logo](vimlogo-564x564.eps)

# Haskell code

```haskell
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)
```

# LISP (Scheme)

```scheme
(define (fib n)
  (cond ((zero? n) 0)
        ((= n 1) 1)
        (else (+ (fib (- n 1)) (fib (- n 2))))))
```

