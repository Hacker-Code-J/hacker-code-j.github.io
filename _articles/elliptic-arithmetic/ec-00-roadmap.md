---
title: "Elliptic Arithmetic 00: Roadmap for a C Curve Library"
layout: page
categories: Computing
tags: [elliptic-arithmetic, C, cryptography, SageMath]
topics: elliptic curves, finite fields, C implementation, bignum interface, verification
short: "A roadmap from prime-field arithmetic to constant-time elliptic-curve scalar multiplication."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-00" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 00</p>

# Roadmap for a C curve library

<p class="ec-deck">An elliptic-curve library is a stack: machine words implement field elements, field elements implement points, points implement scalar multiplication, and protocols add validation rules above that stack.</p>
</header>

These notes continue the [bignum arithmetic series](/articles/bn-00-roadmap/). The bignum layer defines limbs, baseline radix $$B=2^{16}$$, Montgomery reduction, canonicalization, and constant-time C idioms. The elliptic layer uses that substrate to implement the group law on a curve over a finite field.

The reference spine is Hankerson, Menezes, and Vanstone, *Guide to Elliptic Curve Cryptography*: finite-field arithmetic in Chapter 2, point formulas and scalar multiplication in Chapter 3, domain-parameter and protocol checks in Chapter 4, and implementation/security issues in Chapter 5.

## Coverage audit

| Source material | Covered here | Bignum dependency |
|---|---|---|
| Chapter 2, prime-field arithmetic, reduction, inversion | Articles 01, 05, 09, 11 | [Montgomery arithmetic](/articles/bn-07-montgomery-arithmetic/), [prime fields](/articles/bn-10-prime-field-arithmetic/) |
| Chapter 3.1, curve equations, group law, order, group structure | Articles 01, 02, 08 | fixed-width field operations and canonical comparison |
| Chapter 3.2, projective/Jacobian coordinates and operation counts | Articles 03, 04 | field multiplication, squaring, inversion avoidance |
| Chapter 3.3, binary, NAF, window, fixed-base scalar multiplication | Articles 06, 07, 12 | constant-time tables and limb-level selects |
| Chapter 4.2-4.3, domain parameters, public-key validation | Articles 08, 09, 10 | modular arithmetic for subgroup/order checks |
| Chapter 4.4-4.6, ECDSA, ECIES, ECDH-style needs | Article 10 | scalar arithmetic and point multiplication |
| Chapter 5.1 and 5.3, software and secure implementation | Articles 05, 07, 12 | C undefined behavior, timing discipline, testing |

This series is deliberately prime-field first. Binary-field and Koblitz material from the book is noted where it changes the algorithmic tradeoff, but the C library target is a short-Weierstrass prime-field implementation.

## Library boundary

For a fixed curve over $$\mathbb F_p$$,

$$
E: y^2=x^3+ax+b,\qquad 4a^3+27b^2\ne 0 \pmod p,
$$

the arithmetic layer should expose:

1. field operations on canonical or explicitly lazy residues;
2. affine and Jacobian point representations;
3. point validation and subgroup-related checks for public data;
4. scalar multiplication routines whose control flow is independent of secret scalar bits.

The layer should not pretend to implement ECDSA or ECDH by itself. Protocols still determine nonce generation, transcript binding, key derivation, signature encoding, and invalid-input handling.

## Two concrete running examples

**Toy curve for exact inspection.** Over $$\mathbb F_{17}$$, the curve

$$
E: y^2=x^3+2x+2
$$

is nonsingular because $$4\cdot 2^3+27\cdot 2^2=140\equiv 4\pmod {17}$$. Small-field examples make every exceptional case visible: infinity, inverses, doubling with $$y=0$$, and points that are not on the curve.

**Implementation-scale prime.** For a 256-bit prime curve under the 32-bit-only profile, a field element may be represented by sixteen 16-bit limbs. Multiplication first produces a value below $$B^{32}$$ with $$B=2^{16}$$, then a reduction routine returns a residue in a documented range. The elliptic formulas do not see the raw integer; they see the field API.

## SageMath as oracle

SageMath supplies exact algebra and test vectors. It does not prove C behavior: C still needs word-size bounds, no signed overflow, and constant-time review.

```python
p = 17
F = GF(p)
E = EllipticCurve(F, [2, 2])
P = E(5, 1)
print(E.discriminant() != 0)
print(2*P)
print(19*P == 0*P)
```

## Article route

| Articles | Purpose |
|---|---|
| 01-02 | Prime fields, curve equations, affine points, and the group law. |
| 03-04 | Projective/Jacobian representation and point formulas suitable for C. |
| 05-07 | Field API boundaries, scalar multiplication, and side-channel discipline. |
| 08-10 | Validation, standard parameters, and protocol arithmetic needs. |
| 11-12 | SageMath testing and a minimal C library layout. |

<nav class="ec-nav">
  <span></span>
  <a class="ec-next" href="/articles/ec-01-fields-and-curve-equations/"><span>Next</span>Elliptic Arithmetic 01: Fields and Curve Equations</a>
</nav>

</article>

