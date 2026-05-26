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

## Clarity-first product with two-word products

```c
static uint32_t bn_add_word_at(limb_t *r, uint32_t len, uint32_t pos, limb_t x) {
    if (x == 0u) return 0u;
    while (pos < len) {
        limb_t old = r[pos];
        r[pos] = old + x;
        if (r[pos] >= old) return 0u;
        x = 1u;
        pos++;
    }
    return 1u;
}

void bn_mul_n(limb_t *scratch, const limb_t *a, const limb_t *b, uint32_t n) {
    uint32_t out_len = 2u * n;
    uint32_t scratch_len = out_len + 1u;
    for (uint32_t i = 0; i < scratch_len; i++) scratch[i] = 0;

    for (uint32_t i = 0; i < n; i++) {
        for (uint32_t j = 0; j < n; j++) {
            limb_t lo, hi;
            bn_mul_word(a[i], b[j], &lo, &hi);
            (void)bn_add_word_at(scratch, scratch_len, i + j, lo);
            (void)bn_add_word_at(scratch, scratch_len, i + j + 1u, hi);
        }
    }
    /* The product is in scratch[0..out_len-1]; scratch[out_len] must be zero. */
}
```

This code is compact but its safety relies on a bound.

<div class="bn-proof" markdown="1">
<span class="bn-env-title">Inner accumulator bound</span>

Each call to `bn_mul_word` returns `lo` and `hi` such that

$$
a_i b_j=\texttt{lo}+\texttt{hi}B,\qquad B=2^{32}.
$$

Adding `lo` at position $$i+j$$ and `hi` at position $$i+j+1$$ preserves the convolution value. The helper `bn_add_word_at` is the correctness-first helper used by the P-256 test workspace: it propagates a one-word addend by repeated `uint32_t` addition and comparison, then returns when no carry remains. Its loop invariant is that `x` is the pending carry into the current word. The scratch buffer has one extra word, so a carry past the public `2n` product words is observable during testing instead of being silently discarded. For a valid product below $$B^{2n}$$, that extra word must finish as zero.
</div>

## Half-word product lemma

A fixed-field implementation can expose 32-bit words while still using only 32-bit C operations. The proof obligation changes: a word product is no longer one accumulator value. Write

$$
x=x_0+x_1 2^{16},\qquad y=y_0+y_1 2^{16},\qquad 0\le x_i,y_i<2^{16}.
$$

Then compute four 16-by-16 products $$p_{00},p_{01},p_{10},p_{11}$$. The middle carry

$$
m=(p_{00} \operatorname{div} 2^{16})+(p_{01} \bmod 2^{16})+(p_{10} \bmod 2^{16})
$$

is less than $$3\cdot 2^{16}$$, so its low half contributes to the low output word and its high half is at most $$2$$. The high output word is

$$
p_{11}+(p_{01} \operatorname{div} 2^{16})+(p_{10} \operatorname{div} 2^{16})+(m \operatorname{div} 2^{16}),
$$

which is still below $$2^{32}$$. This lemma is the normal teaching path in these notes: public bignum words are 32-bit, while primitive products are discharged through 16-bit halves.

## Why carry scheduling is part of the proof

The clarity-first loop above is deliberately simple: it adds each two-word product into a zeroed `2*n + 1` scratch buffer and propagates carries immediately. This mirrors the internal test implementation, not a production constant-time multiplier. If the product operands are secret, replace the early-exit carry helper with a fixed public-suffix pass and review the generated code. Faster row-wise schedules are possible, but each one must restate where the high word of every product is stored and why carry propagation cannot run past the scratch buffer.

Changing the loop order invalidates the proof and requires a new bound.

This skeleton assumes `scratch` has length at least `2*n + 1` and does not overlap `a` or `b`. If in-place multiplication is part of the public API, compute into a separate scratch buffer and copy the low `2*n` product words after the product is complete.

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
def to_limbs(x, n, w=32):
    B = 2^w
    return [(x // B^i) % B for i in range(n)]

def from_limbs(a, w=32):
    B = 2^w
    return sum(Integer(a[i]) * B^i for i in range(len(a)))

w, n = 32, 8
B = 2^w
vectors = [
    (B^n-1, B^n-1),
    (B^3 + 2*B + 9, B^2 + B - 1),
]
for x, y in vectors:
    print(from_limbs(to_limbs(x*y, 2*n, w), w) == x*y)
```

## Cryptographic note

Schoolbook multiplication has a fixed outer convolution shape for fixed $$n$$. That is only a starting point for constant-time arithmetic: the correctness-first carry helper above exits early, so it is suitable for the internal test workspace but not for secret-dependent production multiplication. A production routine needs fixed public carry propagation, fixed memory traversal, and compiler-output review.

<nav class="bn-nav">
  <a href="/articles/bn-02-addition-subtraction-and-comparison/"><span>Previous</span>Bignum Arithmetic 02: Addition, Subtraction, and Comparison</a>
  <a class="bn-next" href="/articles/bn-04-squaring-and-specialized-products/"><span>Next</span>Bignum Arithmetic 04: Squaring and Specialized Products</a>
</nav>

</article>
