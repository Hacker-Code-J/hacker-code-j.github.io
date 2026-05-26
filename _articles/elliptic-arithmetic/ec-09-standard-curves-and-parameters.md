---
title: "Elliptic Arithmetic 09: Standard Curves and Parameters"
layout: page
categories: Computing
tags: [elliptic-arithmetic, standard-curves, SageMath]
topics: P-256, secp256k1, Curve25519, parameters, curve models
short: "How standard curve parameters shape formulas, field representation, and implementation boundaries."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-09" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 09</p>

# Standard curves and parameters

<p class="ec-deck">A curve name is not just a modulus. It fixes the equation, subgroup order, base point, coordinate choices, encoding rules, and validation expectations.</p>
</header>

The appendix and standards discussion in the reference book are useful because real libraries do not implement "an elliptic curve" generically; they implement named parameter sets with fixed arithmetic.

## P-256-style short Weierstrass curves

NIST P-256 uses a prime field and a short-Weierstrass equation with $$a=-3$$. The $$a=-3$$ shape supports the efficient Jacobian doubling formula described earlier. Its pseudo-Mersenne-like prime supports specialized reduction.

```c
typedef struct { uint32_t v[8]; } fe256_t;

static const fe256_t p256_p = { .v = {
    0xffffffffu, 0xffffffffu, 0xffffffffu, 0x00000000u,
    0x00000000u, 0x00000000u, 0x00000001u, 0xffffffffu
}};

static const fe256_t p256_b = { .v = {
    0x27d2604bu, 0x3bce3c3eu, 0xcc53b0f6u, 0x651d06b0u,
    0x769886bcu, 0xb3ebbd55u, 0xaa3a93e7u, 0x5ac635d8u
}};

static const fe256_t p256_gx = { .v = {
    0xd898c296u, 0xf4a13945u, 0x2deb33a0u, 0x77037d81u,
    0x63a440f2u, 0xf8bce6e5u, 0xe12c4247u, 0x6b17d1f2u
}};

static const fe256_t p256_gy = { .v = {
    0x37bf51f5u, 0xcbb64068u, 0x6b315eceu, 0x2bce3357u,
    0x7c0f9e16u, 0x8ee7eb4au, 0xfe1a7f9bu, 0x4fe342e2u
}};

static const uint32_t p256_n[8] = {
    0xfc632551u, 0xf3b9cac2u, 0xa7179e84u, 0xbce6faadu,
    0xffffffffu, 0xffffffffu, 0x00000000u, 0xffffffffu
};
```

These constants are little-endian 32-bit words. Generate and check them from exact integers; do not transcribe by hand without a test.

## secp256k1

secp256k1 uses

$$
y^2=x^3+7
$$

over $$p=2^{256}-2^{32}-977$$. Here $$a=0$$, so the $$a=-3$$ doubling shortcut does not apply. The curve has efficiently computable endomorphism structure, but using it safely requires scalar decomposition and additional side-channel review.

## Curve25519 contrast

Curve25519 is commonly implemented with Montgomery-curve x-coordinate scalar multiplication, not the short-Weierstrass Jacobian formulas in these notes. It is relevant as a design contrast: exception-controlled ladder formulas, clamping/encoding rules, and cofactor conventions can be more important than reusing a generic Weierstrass layer.

## SageMath parameter generation

```python
def words(x, n=8):
    return [hex((Integer(x) >> (32*i)) & 0xffffffff) for i in range(n)]

p = 2^256 - 2^224 + 2^192 + 2^96 - 1
n = Integer("ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551", 16)
b = Integer("5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b", 16)
gx = Integer("6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296", 16)
gy = Integer("4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5", 16)
F = GF(p)
E = EllipticCurve(F, [F(-3), F(b)])
print(E.discriminant() != 0)
print(E(F(gx), F(gy)) in E)
print(words(p))
print(words(n))
```

## Two implementation lessons

For P-256, the field prime and $$a=-3$$ shape encourage a specialized reducer and specialized doubling. For secp256k1, the prime supports reduction by folding high bits, but the curve equation changes the point-formula schedule.

For a minimal library, implement one named curve first. A generic runtime curve interface increases attack surface: variable parameters, different formula preconditions, and validation differences all become part of the API.

<nav class="ec-nav">
  <a href="/articles/ec-08-curve-validation-and-subgroups/"><span>Previous</span>Elliptic Arithmetic 08: Curve Validation and Subgroups</a>
  <a class="ec-next" href="/articles/ec-10-ecdsa-and-ecdh-arithmetic-needs/"><span>Next</span>Elliptic Arithmetic 10: ECDSA and ECDH Arithmetic Needs</a>
</nav>

</article>

