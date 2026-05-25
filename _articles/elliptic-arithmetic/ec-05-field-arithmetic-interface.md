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

Let $$w=16$$, $$B=2^w$$, and let an $$n$$-limb integer represent

$$
\operatorname{val}_B(a)=\sum_{i=0}^{n-1}a_iB^i.
$$

This is inherited from [bignum arithmetic](/articles/bn-00-roadmap/). A prime-field element may be stored canonically, $$0\le x<p$$, or in Montgomery form, $$\tilde x=xR\bmod p$$ where $$R=B^n$$.

```c
typedef struct { uint16_t limb[16]; } fe_t;

void fe_add(fe_t *r, const fe_t *a, const fe_t *b); /* r < 2p or canonical: document it */
void fe_sub(fe_t *r, const fe_t *a, const fe_t *b);
void fe_mul(fe_t *r, const fe_t *a, const fe_t *b); /* Montgomery multiply if inputs are Montgomery */
void fe_sqr(fe_t *r, const fe_t *a);
void fe_cmov(fe_t *r, const fe_t *a, uint32_t take);
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

## Constant-time conditional move

```c
static void fe_cmov(fe_t *r, const fe_t *a, uint32_t take) {
    uint32_t mask = 0u - take;
    for (uint32_t i = 0; i < 16; i++) {
        uint16_t t = (uint16_t)(mask & (r->limb[i] ^ a->limb[i]));
        r->limb[i] ^= t;
    }
}
```

Precondition: `take` is 0 or 1. Postcondition: `r` is unchanged if `take=0`, and becomes `a` if `take=1`. The loop count and memory locations are public.

## Two range examples

If `fe_add` returns a value below $$2p$$, then a later `fe_mul` must either accept inputs below $$2p$$ or the addition result must be canonicalized. If `fe_mul` accepts only $$<p$$, feeding it a lazy sum is a contract violation.

If `fe_half` receives odd $$x$$, it may compute $$(x+p)/2$$. The addition $$x+p$$ must fit the temporary representation. For a sixteen-limb 256-bit prime in the baseline profile, this is a seventeen-limb proof unless the implementation uses masked add-with-carry.

## SageMath contract model

```python
p = 2^255 - 19
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

