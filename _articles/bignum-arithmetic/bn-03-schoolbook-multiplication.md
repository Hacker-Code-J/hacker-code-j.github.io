---
title: "Bignum Arithmetic 03: Schoolbook Multiplication"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: schoolbook multiplication, convolution, accumulators, C tests
short: "Convolution, multiply-add loops, carry scheduling, and accumulator bounds."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-03" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 03</p>

# Schoolbook multiplication

<p class="bn-deck">Multiplication is convolution plus a carry discipline. The proof is not optional: a single underestimated partial sum becomes an overflow bug.</p>
</header>

For $$a,b<B^n$$ represented by limbs, the product is

$$
\operatorname{val}(a)\operatorname{val}(b)
=\sum_{k=0}^{2n-2}\left(\sum_{i+j=k}a_i b_j\right)B^k.
$$

A full product needs $$2n$$ limbs. A modular multiplication may reduce during the product, but the unreduced schoolbook product is the reference algorithm.

## Clarity-first product with a 32-bit accumulator

```c
void bn_mul_n(limb_t *r, const limb_t *a, const limb_t *b, uint32_t n) {
    for (uint32_t i = 0; i < 2u*n; i++) r[i] = 0;

    for (uint32_t i = 0; i < n; i++) {
        dlimb_t carry = 0;
        for (uint32_t j = 0; j < n; j++) {
            dlimb_t z = (dlimb_t)a[i] * b[j] + r[i+j] + carry;
            r[i+j] = (limb_t)z;
            carry = z >> BN_LIMB_BITS;
        }
        r[i+n] = (limb_t)carry;
    }
}
```

This code is compact but its safety relies on a bound.

<div class="bn-proof" markdown="1">
<span class="bn-env-title">Inner accumulator bound</span>

At each inner step,

$$
z=a_i b_j+r_{i+j}+c.
$$

We have $$a_i b_j\le B^2-2B+1$$, $$r_{i+j}\le B-1$$, and the incoming carry from the previous step is at most $$B-1$$. Therefore

$$
z\le B^2-1<B^2.
$$

So `uint32_t` is sufficient for 16-bit limbs, and the new carry `z >> BN_LIMB_BITS` is a limb.
</div>

## Why `r[i+n] = carry` is safe here

For the loop order above, `r[i+n]` has not yet been written by any previous row: row $$k<i$$ writes no farther than `r[k+n]`, and $$k+n\le i+n-1$$. The previous high carry at `r[i+n-1]` is included during the last inner iteration, where `j=n-1`. The invariant after finishing row $$i$$ is that the low $$i+n+1$$ limbs equal the sum of rows $$0,\ldots,i$$, so direct assignment of the new carry to `r[i+n]` is safe for this specific schedule.

Changing the loop order invalidates this argument and requires a new proof.

This skeleton also assumes `r` does not overlap `a` or `b`. If in-place multiplication is part of the API, compute into a separate `2*n`-limb temporary and copy after the product is complete.

## Example: two-limb product

Let $$a=a_0+a_1B$$ and $$b=b_0+b_1B$$. Then

$$
ab=a_0b_0+(a_0b_1+a_1b_0)B+a_1b_1B^2.
$$

The middle coefficient can exceed $$B$$, so it is not a limb until carry propagation has been performed.

## Example: high carry stress

Take $$a_i=b_i=B-1$$ for all $$i$$. The coefficient of $$B^{n-1}$$ before carrying is $$n(B-1)^2$$. This is far larger than one double-width word when $$n$$ is large, which is why the implementation does not accumulate a full column naively. It accumulates one row at a time and carries immediately.

## Test vectors with SageMath

```python
def to_limbs(x, n, w=16):
    B = 2^w
    return [(x // B^i) % B for i in range(n)]

def from_limbs(a, w=16):
    B = 2^w
    return sum(Integer(a[i]) * B^i for i in range(len(a)))

w, n = 16, 8
B = 2^w
vectors = [
    (B^n-1, B^n-1),
    (B^3 + 2*B + 9, B^2 + B - 1),
]
for x, y in vectors:
    print(from_limbs(to_limbs(x*y, 2*n, w), w) == x*y)
```

## Cryptographic note

Schoolbook multiplication has fixed loop counts for fixed $$n$$. That is good for constant-time arithmetic. Do not replace it with algorithms whose recursion shape depends on operand size when operand size is secret or variable in a protocol transcript.

<nav class="bn-nav">
  <a href="/articles/bn-02-addition-subtraction-and-comparison/"><span>Previous</span>Bignum Arithmetic 02: Addition, Subtraction, and Comparison</a>
  <a class="bn-next" href="/articles/bn-04-squaring-and-specialized-products/"><span>Next</span>Bignum Arithmetic 04: Squaring and Specialized Products</a>
</nav>

</article>
