---
title: "Elliptic Arithmetic 05: Field Arithmetic Interface"
layout: page
categories: Computing
tags: [elliptic-arithmetic, field-arithmetic, Montgomery, C]
topics: field API, Montgomery representation, lazy reduction, canonicalization, constant-time select
short: "The finite-field API that lets elliptic formulas become safe C."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-05" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 05</p>

# Field arithmetic interface

<p class="ec-deck">Most elliptic-curve bugs are field-layer contract bugs: a formula assumes one residue range while the implementation silently returns another.</p>
</header>

The point layer should not know how Montgomery reduction works. It should know exactly what the field layer promises.

## Representation contract

Let $$B=2^w$$, and let an $$n$$-word integer represent

$$
\operatorname{val}_B(a)=\sum_{i=0}^{n-1}a_iB^i.
$$

This is inherited from [bignum arithmetic](/articles/bn-00-roadmap/). The teaching implementation has $$w=32$$ and $$n=8$$ for P-256, while each word product is implemented through 16-bit partial products. A prime-field element may be stored canonically, $$0\le x<p$$, or in Montgomery form, $$\tilde x=xR\bmod p$$ where $$R=B^n$$.

```c
typedef uint32_t word_t;
enum { P256_WORDS = 8 };

typedef struct { word_t v[P256_WORDS]; } fe256_t;

void fe256_add(fe256_t *r, const fe256_t *a, const fe256_t *b); /* canonical output here */
void fe256_sub(fe256_t *r, const fe256_t *a, const fe256_t *b);
void fe256_mul(fe256_t *r, const fe256_t *a, const fe256_t *b); /* normal field product */
void fe256_sqr(fe256_t *r, const fe256_t *a);
void fe256_to_mont(fe256_t *r, const fe256_t *a);
void fe256_from_mont(fe256_t *r, const fe256_t *a);
void fe256_mont_mul(fe256_t *r, const fe256_t *a, const fe256_t *b);
```

## Montgomery form

If all nontrivial field multiplications are Montgomery products, elliptic formulas can stay in Montgomery representation:

$$
\operatorname{MontMul}(\tilde x,\tilde y)=xyR\bmod p.
$$

Addition and subtraction are representation-preserving because

$$
\tilde x+\tilde y\equiv (x+y)R\pmod p.
$$

This is why [Montgomery arithmetic](/articles/bn-07-montgomery-arithmetic/) is the natural bridge from bignum to ECC.

Proof-audit note: the representation choice applies to constants as well as variables. If point formulas operate on Montgomery residues, curve constants, affine input coordinates, and helpers such as `fe256_mul_small(..., 3u)` or `fe256_half` must be represented or interpreted in the same field representation. Silently mixing canonical and Montgomery residues invalidates the formula even when every individual field routine is correct.

## Constant-time conditional move

```c
static void fe256_cmov(fe256_t *r, const fe256_t *a, uint32_t take) {
    uint32_t mask = 0u - take;
    for (uint32_t i = 0; i < P256_WORDS; i++) {
        word_t t = mask & (r->v[i] ^ a->v[i]);
        r->v[i] ^= t;
    }
}
```

Precondition: `take` is 0 or 1. Postcondition: `r` is unchanged if `take=0`, and becomes `a` if `take=1`. The loop count and memory locations are public.

## Two range examples

If `fe256_add` returns a value below $$2p$$, then a later `fe256_mul` must either accept inputs below $$2p$$ or the addition result must be canonicalized. If `fe256_mul` accepts only $$<p$$, feeding it a lazy sum is a contract violation.

If `fe256_half` receives odd $$x$$, it may compute $$(x+p)/2$$. The addition $$x+p$$ must fit the temporary representation. For the P-256 word model this is a nine-word proof: eight low words plus one carry word, followed by a right shift.

## SageMath contract model

```python
p = 2^256 - 2^224 + 2^192 + 2^96 - 1
R = 2^256
def enc(x): return (x*R) % p
def mont(x, y): return (x*y*inverse_mod(R, p)) % p
for x, y in [(1, 2), (p-2, p-3), (123456789, 987654321)]:
    print(mont(enc(x), enc(y)) == enc((x*y) % p))
    print((enc(x) + enc(y)) % p == enc((x+y) % p))
```

<nav class="ec-nav">
  <a href="/articles/ec-04-jacobian-addition-and-doubling/"><span>Previous</span>Elliptic Arithmetic 04: Jacobian Addition and Doubling</a>
  <a class="ec-next" href="/articles/ec-06-scalar-multiplication/"><span>Next</span>Elliptic Arithmetic 06: Scalar Multiplication</a>
</nav>

</article>

