(use srfi-1)
(use util.match)

(define (ket . id) (list `(ket ,id . 1)))
(define (ket+ . kss) (apply append kss))
(define (ket* r ks)
  (map (match-lambda (('ket id . p) `(ket ,id . ,(* r p)))) ks))

(define (norm ks)
  (let ((table (make-hash-table 'equal?)))
  (for-each (lambda (k)
      (let ((id (cadr k)) (p (cddr k)))
      ;(inc! sum (* p p))
      (hash-table-update! table id (cut + p <>) 0)))
    ks)
  (let1 ret
        (map (cut cons 'ket <>) (hash-table->alist table))
  (ket*
    (/ (sqrt (apply + (map (compose (cut expt <> 2) cddr) ret))))
    ret))))

(define +> (norm (ket+ (ket 0) (ket 1))))
(define -> (norm (ket+ (ket 0) (ket* -1 (ket 1)))))

(use srfi-42)
(define (inner* a b)
  (sum-ec
    (: k1 a)
    (: k2 b)
    (if (equal? (cadr k1) (cadr k2))
        (* (cddr k1) (cddr k2)) 0)))

(define (q-iota . args)
  ($ norm $ ket+ $* map ket $ apply iota args))

(define *N* 4)
(define (U i)
  ($ norm
   $ apply ket+
   $ list-ec (: j *N*)
   $ cond [(= i j) (ket 0)]
          [(< i j) (ket i j)]
          [ else   (ket* -1 (ket j i))]))

(define (L i)
  ($ norm
   $ apply ket+
   $ list-ec (: j *N*) (if (not (= i j)))
   $ cond [(< i j) (ket+ (ket i j) (ket j i))]
          [ else   (ket+ (ket* -1 (ket j i)) (ket i j))]))


(define (test op)
  (for-each (^i
      (for-each (^j
        (format #t "~a " (inner* (op i) (op j))))
        (iota (- *N* i) i))
      (newline))
    (iota *N*)))
