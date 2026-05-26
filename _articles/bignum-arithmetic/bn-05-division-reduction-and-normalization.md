---
title: "Bignum Arithmetic 05: Division, Reduction, and Normalization"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: division, normalization, quotient estimation, reduction
short: "Long division, quotient estimates, correction steps, and cryptographic cautions."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-05" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 05</p>

# Division, reduction, and normalization

<p class="bn-deck">General division is the most delicate classical bignum operation. Cryptographic code often avoids it in the hot path, but reduction by arbitrary moduli still requires understanding it.</p>
</header>

Given $$u,v$$ with $$v>0$$, division computes

$$
u=qv+r,\qquad 0\le r<v.
$$

In limb algorithms, quotient estimation is performed from the most significant limbs after normalization.

## Normalization

Normalize the divisor so that its top limb satisfies

$$
B/2\le v_{m-1}<B.
$$

This can be achieved by left-shifting both dividend and divisor by the same bit count. Normalization improves quotient-digit estimates because the leading limb carries enough information.

<div class="bn-env" markdown="1">
<span class="bn-env-title">Precondition for Knuth-style division</span>

For base $$B$$, divisor length $$m\ge 2$$, and normalized top limb $$v_{m-1}\ge B/2$$, the trial quotient

$$
\hat q=\left\lfloor\frac{u_{j+m}B+u_{j+m-1}}{v_{m-1}}\right\rfloor
$$

is at most a small correction away from the true quotient digit.

Proof-audit note: in the 32-bit-only teaching model, the numerator $$u_{j+m}B+u_{j+m-1}$$ is a mathematical two-word value, not a C object stored in a wider integer type. A C implementation must either implement a two-word quotient estimator using only `uint32_t` operations or keep general division out of the secret-dependent arithmetic path.
</div>

## Quotient correction

The estimated digit may be too large. The algorithm multiplies $$\hat qv$$, subtracts it from the current window, and if the subtraction underflows, adds back $$v$$ and decrements $$\hat q$$.

This is a rare correction in ordinary arithmetic. In cryptographic code, rarity is not a constant-time argument. If operands are secret, correction loops leak information unless bounded and masked.

## Example: decimal analogy

In base 10, dividing 9876 by 98 estimates the first quotient digit from 98 into 987, giving 10, then clamps to 9. The same phenomenon occurs in base $$B$$: quotient digits must lie in $$[0,B)$$.

## Example: modular reduction by an RSA modulus

A 4096-bit intermediate reduced modulo a 2048-bit RSA modulus can be handled by long division, but RSA private operations normally use Montgomery reduction because repeated divisions would dominate cost and may introduce variable-time correction behavior.

## C shape for public division

```c
/* Variable-time skeleton for public inputs only. */
int bn_div_public(limb_t *q, limb_t *r,
                  const limb_t *u, uint32_t un,
                  const limb_t *v, uint32_t vn) {
    /* 1. reject v=0
       2. normalize u and v
       3. estimate quotient limbs from high words
       4. multiply-subtract
       5. correct overestimates
       6. denormalize remainder */
    (void)q; (void)r; (void)u; (void)un; (void)v; (void)vn;
    return 0;
}
```

The important label is `public`. General division is usually not the primitive to expose for secret-dependent modular arithmetic.

## Reduction contract

For public modulus $$m$$ and input $$x$$, a reduction routine returns $$r$$ such that

$$
r\equiv x\pmod m,
\qquad 0\le r<m.
$$

If the routine returns a lazy residue, its range must be explicit, for example $$0\le r<2m$$.

## SageMath quotient tests

```python
cases = [(9876, 98), (2^4096 - 123, 2^2048 - 159), (2^256 + 17, 2^127 - 1)]
for u, v in cases:
    q, r = u.quo_rem(v)
    print(u == q*v + r)
    print(0 <= r < v)
```

Use these values to generate known-answer tests for a variable-time public division implementation.

<nav class="bn-nav">
  <a href="/articles/bn-04-squaring-and-specialized-products/"><span>Previous</span>Bignum Arithmetic 04: Squaring and Specialized Products</a>
  <a class="bn-next" href="/articles/bn-06-modular-add-sub-and-reduction/"><span>Next</span>Bignum Arithmetic 06: Modular Add, Subtract, and Reduction</a>
</nav>

</article>
