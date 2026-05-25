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
ec_field.h      fe_t and field operations modulo p
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
int ec_public_key_validate(const ec_affine_t *q);
int ec_mul_base(ec_affine_t *r, const scalar_t *k_secret);
int ec_mul_public(ec_affine_t *r, const scalar_t *k_public, const ec_affine_t *p_public);
int ec_ecdh_raw(ec_affine_t *r, const scalar_t *d_secret, const ec_affine_t *q_public);
```

`ec_ecdh_raw` should not perform KDF or protocol transcript handling. It should validate or require validated input according to its name and documentation.

## Fixed-size allocation

Avoid dynamic allocation in the arithmetic core. Fixed-size structs make lifetimes, stack use, and memory access easier to review. Variable-size bignum interfaces belong in a different library layer.

## Two implementation milestones

**Milestone 1: correctness-first.** Implement canonical field operations, affine specification functions, Jacobian doubling/addition, and scalar multiplication. Validate against SageMath for many fixed vectors.

**Milestone 2: constant-time path.** Replace secret-dependent branches and table indexes, audit generated assembly for core selects/swaps, and separate public verification routines from secret scalar routines.

## Generated constants

Use SageMath to generate constants as limb arrays:

```python
def limbs(x, n=16, w=16):
    B = 2^w
    return [(Integer(x) // B^i) % B for i in range(n)]
p = 2^256 - 2^32 - 977
print([hex(v) for v in limbs(p)])
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

