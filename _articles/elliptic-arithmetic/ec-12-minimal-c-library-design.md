---
title: "Elliptic Arithmetic 12: Minimal C Library Design"
layout: page
categories: Computing
tags: [elliptic-arithmetic, C, library-design, cryptography]
topics: file organization, API design, fixed-size structs, production boundary
short: "A small, auditable C library layout for field, point, and scalar arithmetic."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-12" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 12</p>

# Minimal C library design

<p class="ec-deck">A reviewable curve library has narrow layers: words, field elements, points, scalars, and tests. Each layer states what it receives, returns, and leaks.</p>
</header>

The goal is not a universal ECC framework. The goal is a small primitive library for one named prime-field curve, written so correctness and side-channel assumptions can be audited.

## File layout

```text
ec_word.h       fixed-width types, carry helpers, constant-time masks
ec_field.h      fe256_t and field operations modulo the P-256 prime
ec_scalar.h     arithmetic modulo subgroup order n
ec_point.h      affine/Jacobian point types and group operations
ec_mul.h        scalar multiplication APIs
ec_params.h     generated curve constants
tests/          SageMath vectors and C harnesses
```

This mirrors the bignum split: word and field arithmetic are the substrate; point arithmetic is the new group-law layer.
At the mathematical boundary, the field layer realizes $$\mathbb F_p$$, the point layer realizes $$E(\mathbb F_p)$$, and scalar multiplication realizes the map $$k\mapsto [k]P$$.

## API boundary

```c
int p256_public_key_validate(const p256_affine_t *q);
int p256_mul_base(p256_affine_t *r, const word_t k_secret[P256_WORDS]);
int p256_mul_public(p256_affine_t *r, const word_t k_public[P256_WORDS], const p256_affine_t *p_public);
int p256_ecdh_raw(p256_affine_t *r, const word_t d_secret[P256_WORDS], const p256_affine_t *q_public);
```

`p256_ecdh_raw` should not perform KDF or protocol transcript handling. It should validate or require validated input according to its name and documentation.

## Fixed-size allocation

Avoid dynamic allocation in the arithmetic core. Fixed-size structs make lifetimes, stack use, and memory access easier to review. Variable-size bignum interfaces belong in a different library layer.

## Two implementation milestones

**Milestone 1: correctness-first.** Implement canonical field operations, affine specification functions, Jacobian doubling/addition, and scalar multiplication. Validate against SageMath for many fixed vectors.

**Milestone 2: constant-time path.** Replace secret-dependent branches and table indexes, audit generated assembly for core selects/swaps, and separate public verification routines from secret scalar routines.

## Generated constants

Use SageMath to generate constants as limb arrays:

```python
def words(x, n=8):
    return [hex((Integer(x) >> (32*i)) & 0xffffffff) for i in range(n)]

p = 2^256 - 2^224 + 2^192 + 2^96 - 1
n = Integer("ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551", 16)
b = Integer("5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b", 16)
gx = Integer("6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296", 16)
gy = Integer("4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5", 16)
print(words(p))
print(words(n))
print(words(b))
print(words(gx))
print(words(gy))
```

## Production boundary

A research-grade arithmetic library is not production cryptography until it has:

1. complete protocol-level validation;
2. side-channel analysis on target hardware;
3. fuzzing, sanitizers, and differential tests;
4. review of compiler output for constant-time primitives;
5. a decision about fault attacks and error behavior.

<div class="ec-warning" markdown="1">
<span class="ec-env-title">Boundary statement</span>

Mathematical correctness is necessary. It is not sufficient. The library must document which layer owns randomness, key derivation, encoding, validation, and failure normalization.
</div>

<nav class="ec-nav">
  <a href="/articles/ec-11-testing-with-sagemath/"><span>Previous</span>Elliptic Arithmetic 11: Testing with SageMath</a>
  <span></span>
</nav>

</article>

