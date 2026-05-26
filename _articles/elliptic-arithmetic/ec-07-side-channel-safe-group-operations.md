---
title: "Elliptic Arithmetic 07: Side-Channel Safe Group Operations"
layout: page
categories: Computing
tags: [elliptic-arithmetic, side-channels, constant-time, C]
topics: timing leakage, table lookup, exceptional cases, conditional swap, API discipline
short: "How secret-dependent branches, memory access, and incomplete formulas break correct elliptic arithmetic."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-07" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 07</p>

# Side-channel safe group operations

<p class="ec-deck">A formula can be algebraically correct and still unusable: secret-dependent control flow turns the scalar into an output channel.</p>
</header>

Chapter 5 of the reference book separates efficient implementation from secure implementation. For C code, the boundary is concrete: branches, memory addresses, early exits, and error behavior must not depend on secrets.

## Constant-time swap

```c
static void fe256_swap(fe256_t *a, fe256_t *b, uint32_t bit) {
    uint32_t mask = 0u - bit;
    for (uint32_t i = 0; i < P256_WORDS; i++) {
        word_t t = mask & (a->v[i] ^ b->v[i]);
        a->v[i] ^= t;
        b->v[i] ^= t;
    }
}
```

Precondition: `bit` is 0 or 1. The compiler must not transform this into a branch; inspect generated code for the target toolchain when this primitive protects secrets.

## Incomplete formulas and secret states

Mixed Jacobian addition branches when $$H=0$$. If $$H$$ is secret, the branch leaks whether two points are equal or inverse. There are three defensible options:

1. prove the exceptional cases cannot occur in the scalar algorithm;
2. use complete formulas for the selected curve/model;
3. compute both outcomes and select with masks.

The first option is common but fragile. It must be documented as an invariant, not left as folklore.

## Two failure examples

**Secret bit branch.** A left-to-right double-and-add loop with `if (bit) add()` leaks the Hamming pattern of the scalar to timing and power traces. Even if each addition is constant time, the sequence length differs.

**Secret table index.** A fixed-window routine that reads `table[window]` leaks the window value through cache state. A full scan with conditional moves is slower but aligns the memory trace.

## Public versus secret data

Public-key validation can branch on decoded public coordinates. Secret scalar multiplication cannot branch on scalar bits. ECDSA signature verification uses public scalars derived from the signature and message, but ECDSA signing uses a secret nonce; the same multiplication routine may not be appropriate for both.

## API rule

```c
int p256_mul_public(p256_affine_t *r, const word_t k_public[P256_WORDS], const p256_affine_t *p_public);
int p256_mul_secret(p256_affine_t *r, const word_t k_secret[P256_WORDS], const p256_affine_t *p_public);
```

Separate APIs make review easier. If a function accepts a secret scalar, its documentation must state constant-time expectations and excluded microarchitectural assumptions.

## SageMath cannot test leakage

SageMath can check group-law results, not side-channel properties. Use it to generate expected outputs, then use C-level review, tests, compiler inspection, and platform measurement for leakage-sensitive paths.

```python
p = 17
E = EllipticCurve(GF(p), [2, 2])
P = E(5, 1)
print(13*P)
print(14*P)
```

<nav class="ec-nav">
  <a href="/articles/ec-06-scalar-multiplication/"><span>Previous</span>Elliptic Arithmetic 06: Scalar Multiplication</a>
  <a class="ec-next" href="/articles/ec-08-curve-validation-and-subgroups/"><span>Next</span>Elliptic Arithmetic 08: Curve Validation and Subgroups</a>
</nav>

</article>

