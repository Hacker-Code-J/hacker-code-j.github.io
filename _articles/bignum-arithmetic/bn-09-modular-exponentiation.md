---
title: "Bignum Arithmetic 09: Modular Exponentiation"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: modular exponentiation, fixed-window, Montgomery ladder, RSA
short: "Exponentiation strategies, fixed windows, Montgomery ladders, and table discipline."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-09" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 09</p>

# Modular exponentiation

<p class="bn-deck">Exponentiation is where arithmetic meets side channels: the multiplication routine may be constant-time while the exponent loop leaks the key.</p>
</header>

The mathematical task is

$$
y=x^e\bmod m.
$$

For public exponents, variable-time methods may be acceptable. For secret exponents, the sequence of operations and memory accesses must not reveal exponent bits.

## Square-and-multiply

The ordinary left-to-right algorithm scans exponent bits and multiplies only when a bit is 1. This is not constant-time for secret exponents.

```c
/* Variable-time: only for public e. */
for (uint32_t i = bits; i-- > 0;) {
    mont_sqr(acc, acc, m);
    if (bit(e, i)) mont_mul(acc, acc, base, m);
}
```

## Always multiply

A constant-operation-count variant computes both candidates and selects by mask.

```c
for (uint32_t i = bits; i-- > 0;) {
    mont_sqr(sq, acc, m);
    mont_mul(prod, sq, base, m);
    bn_cmov(acc, prod, sq, n, bit(e, i));
}
```

This still needs fixed-latency `mont_mul`, fixed loop bounds, and a `bit` extraction that does not branch on secret-dependent memory length.

## Fixed-window exponentiation

A window of width $$w_0$$ precomputes odd powers. It reduces multiplications but introduces table lookup risk. Constant-time lookup scans the whole table and conditionally selects each row.

<div class="bn-env" markdown="1">
<span class="bn-env-title">Table selection contract</span>

For secret index $$j$$, do not read `table[j]` directly. Read every table entry and mask-select the desired one. The memory trace must be independent of $$j$$.
</div>

## Montgomery ladder

The ladder maintains two registers, typically $$R_0=x^k$$ and $$R_1=x^{k+1}$$ for the prefix $$k$$. Each bit performs one multiplication and one squaring, with conditional swaps.

## Example: RSA public exponent 65537

For encryption or signature verification with $$e=65537=2^{16}+1$$, the exponent is public. A short fixed sequence of 16 squarings and one multiplication is appropriate. Constant-time with respect to the exponent is not needed, but base and modulus handling still must be correct.

## Example: Diffie-Hellman secret exponent

For finite-field Diffie-Hellman, the exponent is secret. A sliding-window method with direct table indexing leaks. Use a ladder or fixed-window with constant-time table selection.

## Proof sketch

For left-to-right binary exponentiation, after processing bits from the top down to position $$i$$, the accumulator equals $$x^p$$ where $$p$$ is the integer represented by the processed prefix. Squaring shifts the prefix left by one bit; multiplying by $$x$$ appends a 1 bit.

## SageMath vectors

```python
m = 2^127 - 1
for x, e in [(5, 65537), (1234567, 0xdeadbeef), (m-2, 12345)]:
    print(power_mod(x, e, m) == pow(x, e, m))
```

<nav class="bn-nav">
  <a href="/articles/bn-08-barrett-and-pseudo-mersenne-reduction/"><span>Previous</span>Bignum Arithmetic 08: Barrett and Pseudo-Mersenne Reduction</a>
  <a class="bn-next" href="/articles/bn-10-prime-field-arithmetic/"><span>Next</span>Bignum Arithmetic 10: Prime-Field Arithmetic</a>
</nav>

</article>
