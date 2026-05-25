---
title: "Bignum Arithmetic 02: Addition, Subtraction, and Comparison"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: multi-limb addition, subtraction, comparison, constant-time masks
short: "Carry chains, borrow chains, branchless masks, and conditional subtraction."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-02" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 02</p>

# Addition, subtraction, and comparison

<p class="bn-deck">The basic loops are short, but their contracts are the foundation for every modular routine above them.</p>
</header>

For $$n$$ limbs, addition computes

$$
[a+b]_{B,n}=\sum_{i=0}^{n-1}(a_i+b_i)B^i.
$$

The returned carry $$c_n$$ records whether the full mathematical sum exceeds $$B^n-1$$.

## Addition contract

Precondition: `a`, `b`, and `r` have length `n`; each input limb is in $$[0,B)$$. Postcondition:

$$
\operatorname{val}(r)+cB^n=\operatorname{val}(a)+\operatorname{val}(b),
\qquad c\in\{0,1\}.
$$

```c
#include <stdint.h>

typedef uint16_t limb_t;
typedef uint32_t dlimb_t;
enum { BN_LIMB_BITS = 16 };

uint32_t bn_add_n(limb_t *r, const limb_t *a, const limb_t *b, uint32_t n) {
    dlimb_t carry = 0;
    for (uint32_t i = 0; i < n; i++) {
        dlimb_t s = (dlimb_t)a[i] + b[i] + carry;
        r[i] = (limb_t)s;
        carry = s >> BN_LIMB_BITS;
    }
    return (uint32_t)carry;
}
```

The comparisons are public arithmetic on machine results. They do not branch in the C source, but compilers may still choose instructions. For high-assurance code, inspect generated code or use a verified backend.

<div class="bn-proof" markdown="1">
<span class="bn-env-title">Loop invariant</span>

After iteration $$i$$,

$$
\sum_{j=0}^{i}r_jB^j+c_{i+1}B^{i+1}
=\sum_{j=0}^{i}(a_j+b_j)B^j.
$$

The single-limb addition has maximum $$(B-1)+(B-1)+1=2B-1$$, so the outgoing carry is either 0 or 1.
</div>

## Subtraction contract

Subtraction computes `a - b` modulo $$B^n$$ and returns the final borrow. Postcondition:

$$
\operatorname{val}(r)=\operatorname{val}(a)-\operatorname{val}(b)+\beta B^n,
\qquad \beta\in\{0,1\}.
$$

Here $$\beta=1$$ means `a < b` and the result is the two's-complement residue modulo $$B^n$$.

```c
uint32_t bn_sub_n(limb_t *r, const limb_t *a, const limb_t *b, uint32_t n) {
    uint32_t borrow = 0;
    for (uint32_t i = 0; i < n; i++) {
        dlimb_t sub = (dlimb_t)b[i] + borrow;
        borrow = ((dlimb_t)a[i] < sub);
        r[i] = (limb_t)((dlimb_t)a[i] - sub);
    }
    return borrow;
}
```

## Constant-time comparison as subtraction

A lexicographic comparison from the most significant limb often branches early. That is acceptable only when inputs are public. For secret residues, compute `a-b` and use the final borrow.

<div class="bn-example" markdown="1">
<span class="bn-env-title">Example: all-limb carry</span>

Let $$n=3$$ and $$a=(B-1,B-1,B-1)$$, $$b=(1,0,0)$$. The result is $$r=(0,0,0)$$ and carry $$1$$. Every limb participates, so this is a mandatory edge-case test.
</div>

<div class="bn-example" markdown="1">
<span class="bn-env-title">Example: conditional subtraction after modular addition</span>

If $$0\le a,b<m<B^n$$, then $$s=a+b<2m<2B^n$$. Compute the $$n$$ low limbs and the carry from the addition, then subtract $$m$$ from the low limbs. Keep the subtracted value if either the addition carried out of limb $$n-1$$ or the subtraction did not borrow; otherwise keep the original low limbs. The carry case matters because the low limbs alone may look smaller than $$m$$ even when the mathematical sum exceeded $$B^n$$.
</div>

## Masked select

```c
static inline limb_t ct_select_limb(limb_t x, limb_t y, uint32_t mask) {
    return (limb_t)((x & mask) | (y & ~mask));
}

void bn_cmov(limb_t *r, const limb_t *x, const limb_t *y, uint32_t n, uint32_t bit) {
    uint32_t mask = 0u - bit; /* all ones if bit=1, else zero */
    for (uint32_t i = 0; i < n; i++) r[i] = ct_select_limb(x[i], y[i], mask);
}
```

The expression `0u - bit` is unsigned arithmetic. It is defined when `bit` is 0 or 1.

## SageMath tests

```python
def limbs(x, n, w):
    B = 2^w
    return [(x // B^i) % B for i in range(n)]

def value(a, w):
    B = 2^w
    return sum(a[i] * B^i for i in range(len(a)))

w, n = 16, 8
B = 2^w
cases = [(B^n-1, 1), (B^2+5, B^2+7), (0, B^n-1)]
for x, y in cases:
    print(value(limbs((x + y) % B^n, n, w), w) == (x + y) % B^n)
```

<nav class="bn-nav">
  <a href="/articles/bn-01-limbs-radix-and-word-size/"><span>Previous</span>Bignum Arithmetic 01: Limbs, Radix, and Word Size</a>
  <a class="bn-next" href="/articles/bn-03-schoolbook-multiplication/"><span>Next</span>Bignum Arithmetic 03: Schoolbook Multiplication</a>
</nav>

</article>
