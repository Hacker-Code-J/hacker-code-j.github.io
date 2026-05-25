---
title: "Bignum Arithmetic 04: Squaring and Specialized Products"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: squaring, cross terms, diagonal terms, overflow bounds
short: "Diagonal terms, doubled cross terms, and safe squaring schedules."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-04" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 04</p>

# Squaring and specialized products

<p class="bn-deck">Squaring saves work because cross terms appear twice. It also creates a new overflow obligation: doubling must be accounted for before it is coded.</p>
</header>

For $$a=\sum_i a_iB^i$$,

$$
a^2=\sum_i a_i^2B^{2i}+2\sum_{0\le i<j<n}a_i a_jB^{i+j}.
$$

A generic multiplication routine is always a correct squaring routine. A specialized squaring routine is an optimization that must prove the doubled cross terms are handled safely.

## Bound for a doubled cross product

If $$0\le a_i,a_j<B$$, then

$$
2a_i a_j\le 2(B-1)^2=2B^2-4B+2.
$$

This does not fit in $$2w$$ bits in general. A 16-bit limb implementation cannot simply compute `2 * ((uint32_t)ai * aj)` and assume it is below $$2^{32}$$. The product must be doubled with carry handling.

<div class="bn-warning" markdown="1">
<span class="bn-env-title">Common squaring bug</span>

For 16-bit limbs, `((uint32_t)x * y) << 1` discards the top bit when $$xy\ge 2^{31}$$. The mathematical term may need 33 bits. Correct code either accumulates cross products one at a time with carries or uses a representation whose bounds leave headroom.
</div>

## Safe strategy

A safe first implementation uses multiplication for squaring:

```c
void bn_sqr_n(limb_t *r, const limb_t *a, uint32_t n) {
    bn_mul_n(r, a, a, n);
}
```

Only optimize after the test suite can compare both implementations across edge cases.

This wrapper inherits the aliasing contract of `bn_mul_n`. If `r == a` is allowed by the public API, square into a temporary product buffer first; otherwise the multiplication loop can overwrite limbs before they are read.

## Specialized accumulation pattern

One robust pattern is:

1. accumulate off-diagonal products into the output with multiply-add;
2. double the full off-diagonal accumulator as a multi-limb left shift by one;
3. add diagonal terms $$a_i^2B^{2i}$$.

This keeps the doubling operation in multi-limb arithmetic, where overflow becomes an explicit carry.

## Example: two limbs

For $$a=a_0+a_1B$$,

$$
a^2=a_0^2+2a_0a_1B+a_1^2B^2.
$$

If $$a_0=a_1=B-1$$, then $$2a_0a_1=2B^2-4B+2$$. This contributes to limbs 1, 2, and possibly 3 after carrying. Treating it as a single double-width value loses information.

## Example: squaring a field element

In a prime field, squaring is often as frequent as multiplication. For exponentiation by $$p-2$$, long chains consist mostly of squarings. A 15 percent squaring speedup can matter, but only if the specialized routine preserves the same canonical or lazy range invariant as multiplication.

## Proof checklist

For a specialized squaring routine, write down:

- where each diagonal term $$a_i^2B^{2i}$$ is added;
- where each cross term $$2a_i a_jB^{i+j}$$ is added;
- the maximum value of each accumulator before carry propagation;
- whether any shift or doubling can exceed the available type width;
- whether the loop schedule depends only on public length $$n$$.

## SageMath differential test

```python
for n in [1, 2, 4, 8]:
    B = 2^16
    tests = [0, 1, B^n - 1, B^(n-1), B^(n-1) + B - 1]
    for x in tests:
        print(x*x < B^(2*n))
```

This says the final product fits in $$2n$$ limbs. It does not say an intermediate doubled cross term fits in one double-width word.

<nav class="bn-nav">
  <a href="/articles/bn-03-schoolbook-multiplication/"><span>Previous</span>Bignum Arithmetic 03: Schoolbook Multiplication</a>
  <a class="bn-next" href="/articles/bn-05-division-reduction-and-normalization/"><span>Next</span>Bignum Arithmetic 05: Division, Reduction, and Normalization</a>
</nav>

</article>
