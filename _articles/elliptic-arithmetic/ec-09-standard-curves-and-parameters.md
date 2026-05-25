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
static const fe_t p256_p = { .limb = {
    0xffff, 0xffff, 0xffff, 0xffff,
    0xffff, 0xffff, 0x0000, 0x0000,
    0x0000, 0x0000, 0x0000, 0x0000,
    0x0001, 0x0000, 0xffff, 0xffff
}};
```

Constants should be generated and checked from exact integers. Do not transcribe by hand without a test.

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
p = 2^256 - 2^32 - 977
F = GF(p)
E = EllipticCurve(F, [0, 7])
print(E.discriminant() != 0)
print((4*0^3 + 27*7^2) % p != 0)
print(p % 4)
```

## Two implementation lessons

For P-256, the field prime and $$a=-3$$ shape encourage a specialized reducer and specialized doubling. For secp256k1, the prime supports reduction by folding high bits, but the curve equation changes the point-formula schedule.

For a minimal library, implement one named curve first. A generic runtime curve interface increases attack surface: variable parameters, different formula preconditions, and validation differences all become part of the API.

<nav class="ec-nav">
  <a href="/articles/ec-08-curve-validation-and-subgroups/"><span>Previous</span>Elliptic Arithmetic 08: Curve Validation and Subgroups</a>
  <a class="ec-next" href="/articles/ec-10-ecdsa-and-ecdh-arithmetic-needs/"><span>Next</span>Elliptic Arithmetic 10: ECDSA and ECDH Arithmetic Needs</a>
</nav>

</article>

