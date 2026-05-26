---
title: "Bignum Arithmetic 08: Barrett and Pseudo-Mersenne Reduction"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: Barrett reduction, pseudo-Mersenne primes, Solinas reduction
short: "Reciprocal reduction, special moduli, and when not to use Montgomery."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-08" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 08</p>

# Barrett and pseudo-Mersenne reduction

<p class="bn-deck">Montgomery reduction is not the only way to avoid division. Reciprocal and special-form reductions trade precomputation for structured arithmetic.</p>
</header>

Barrett reduction fixes a modulus $$m$$ and precomputes an approximation to $$1/m$$. For radix $$B$$ and $$k$$ limbs, define

$$
\mu=\left\lfloor\frac{B^{2k}}{m}\right\rfloor.
$$

For $$x<B^{2k}$$, estimate $$q\approx \lfloor x/m\rfloor$$ using high limbs of $$x\mu$$, then compute $$r=x-qm$$ and correct by subtracting $$m$$ a small bounded number of times.

## Barrett contract

Precondition: $$0<m<B^k$$ and $$0\le x<B^{2k}$$. Postcondition: output $$r\equiv x\pmod m$$ and $$0\le r<m$$ after correction.

The exact quotient approximation depends on the Barrett variant. The implementation must document which high limbs are used and how many correction subtractions are required.

## Example: one fixed RSA public modulus

For repeated public reductions modulo a fixed RSA modulus, Barrett can be useful when operands are public or when a constant-time correction schedule is implemented. For private RSA exponentiation, Montgomery is usually preferable because every multiply is already inside the same odd modulus.

## Pseudo-Mersenne primes

If

$$
p=2^k-c
$$

with small $$c$$, then $$2^k\equiv c\pmod p$$. A high part can be folded into the low part by multiplying by $$c$$.

<div class="bn-example" markdown="1">
<span class="bn-env-title">Example: $$2^{255}-19$$</span>

Write $$x=x_0+x_1 2^{255}$$. Modulo $$p=2^{255}-19$$,

$$
x\equiv x_0+19x_1\pmod p.
$$

The fold is cheap, but the representation must leave enough headroom for the multiplication by 19 and subsequent carries.
</div>

<div class="bn-example" markdown="1">
<span class="bn-env-title">Example: $$2^{448}-2^{224}-1$$</span>

Here $$2^{448}\equiv 2^{224}+1\pmod p$$. A high limb chunk folds into two lower positions. The reduction is still linear, but not a single multiply by a small constant.
</div>

## Barrett versus Montgomery

| Situation | Better default |
|---|---|
| Many products modulo one odd modulus | Montgomery |
| One-off public reduction | Barrett or division |
| Special prime with sparse relation | pseudo-Mersenne/Solinas |
| Secret-dependent correction impossible to bound | redesign |

## C sketch: pseudo-Mersenne fold

```c
/* Conceptual fold for p = 2^255 - 19, not a complete field implementation. */
void fold_25519(limb_t out[8], const limb_t in[16]) {
    /* Split at bit 255 across eight 32-bit words, fold high bits by 19, then carry. */
    (void)out;
    (void)in;
}
```

The omitted details are exactly the important ones: bit 255 cuts through the top 32-bit word. The high one-bit slice and the upper eight input words must be folded using only `uint32_t` additions, shifts by less than 32, and bounded multiplication by the small public constant 19.

## SageMath reduction check

```python
p = 2^255 - 19
for x in [0, 1, p-1, p, 2^510 - 1]:
    x0 = x % 2^255
    x1 = x // 2^255
    print((x0 + 19*x1) % p == x % p)
```

<nav class="bn-nav">
  <a href="/articles/bn-07-montgomery-arithmetic/"><span>Previous</span>Bignum Arithmetic 07: Montgomery Arithmetic</a>
  <a class="bn-next" href="/articles/bn-09-modular-exponentiation/"><span>Next</span>Bignum Arithmetic 09: Modular Exponentiation</a>
</nav>

</article>
