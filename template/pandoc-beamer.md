% Sample Slides
% Hirakata
% \today

# Beamer code

## section, frame-title

I show two rules for section and frame-title.  
(This slides are taken the second.)  
Hmm, you know, by putting two spaces at end of line, the line breaks.

1. The frame-title is &lt;H1&gt; (which begins with #).
In this rule, section = frame-title.

1. Section is &lt;H1&gt;, and the subsection is &lt;H2&gt;
In this, subsection = frame-title.

I think that the second rule is standard,
(and I prefer the first.)

## N.B.

In the second rule,
\alert{DON'T}
insert any paragraph between &lt;H1&gt; and &lt;H2&gt;.

The text after &lt;H2&gt; may disappear.

## itemize

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


# Image

## vim logo

![the Vim logo](vimlogo-564x564.eps)

# Programming code

## colored code

Pandoc makes your code beautiful!

## Haskell

```haskell
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)
```

## LISP (Scheme)

```scheme
(define (fib n)
  (cond ((zero? n) 0)
        ((= n 1) 1)
        (else (+ (fib (- n 1)) (fib (- n 2))))))
```

## JavaScript

```javascript
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n-1) + fib(n-2);
}
```

# Summary

## after write this markdown

Markdown has poor expression

rather than

true beamer-\LaTeX.

## require

i want to write

```tex
\item item
\item<2-> deden!!
```

## and

```tex
\begin{columns}
  \begin{column}{.5\textwidth}
    TEXT
  \end{column}
  \begin{column}{.5\textwidth}
    IMAGE
  \end{column}
\end{columns}
```

I couldn't why, but the above didn't work...

## Summary

- \LaTeX is fuck.
- Markdown is simple and easy.
- The simple is not power.
