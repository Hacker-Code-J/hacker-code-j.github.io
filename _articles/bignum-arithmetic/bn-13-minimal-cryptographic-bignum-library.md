---
title: "Bignum Arithmetic 13: A Minimal Cryptographic Bignum Library"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: C API, Montgomery multiplication, test harness, production boundary
short: "A small API design tying representation, arithmetic, tests, and security boundaries together."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-13" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 13</p>

# A minimal cryptographic bignum library

<p class="bn-deck">A usable primitive layer is not a pile of routines. It is a set of types, invariants, scratch rules, and tests that make misuse visible.</p>
</header>

A minimal library for fixed-size public-key arithmetic can avoid dynamic allocation. The modulus context owns public constants; field or residue values own fixed limb arrays.

## File organization

```text
bn_word.h        word types, static assertions, low/high multiply
bn_core.c        add, sub, compare-public, cmov, shifts
bn_mul.c         schoolbook multiply and square
bn_mod.c         modular add/sub and conditional reduction
bn_mont.c        Montgomery context and multiplication
bn_exp.c         fixed-window or ladder exponentiation
test_bn.c        known-answer and randomized tests
sage/            SageMath vector scripts
```

## Type sketch

```c
typedef uint32_t limb_t;

#define BN_MAX_LIMBS 256

typedef struct {
    uint32_t n;
    limb_t m[BN_MAX_LIMBS];
    limb_t m0inv;
    limb_t r2[BN_MAX_LIMBS];
} bn_mont_ctx;

typedef struct {
    uint32_t n;
    limb_t v[BN_MAX_LIMBS];
} bn;
```

The fixed maximum keeps allocation out of arithmetic. The `n` field is public and must be validated at context creation.

## API contracts

```c
int  bn_mont_init(bn_mont_ctx *ctx, const limb_t *m, uint32_t n);
void bn_to_mont(bn *r, const bn *x, const bn_mont_ctx *ctx);
void bn_from_mont(bn *r, const bn *x, const bn_mont_ctx *ctx);
void bn_mont_mul(bn *r, const bn *a, const bn *b, const bn_mont_ctx *ctx);
void bn_modexp_public(bn *r, const bn *x, const bn *e, const bn_mont_ctx *ctx);
void bn_modexp_secret(bn *r, const bn *x, const bn *e, uint32_t ebits, const bn_mont_ctx *ctx);
```

`public` and `secret` variants are deliberately separate. The exponentiation strategy and table access discipline differ.

## Example: toy RSA modulus

For an educational RSA modulus $$N=pq$$ and public exponent $$e=65537$$:

1. initialize a Montgomery context for $$N$$;
2. convert message representative $$m$$ to Montgomery form;
3. run public exponentiation;
4. convert back.

This tests the same structure used by real RSA verification, without pretending the toy modulus is secure.

## Example: modular multiplication service

A Diffie-Hellman implementation may need only multiplication, squaring, and exponentiation modulo one prime. In that case, expose a field-specific wrapper rather than a generic arbitrary-modulus API. Fewer degrees of freedom means fewer invalid states.

## Test harness skeleton

```c
int main(void) {
    test_add_edges();
    test_sub_edges();
    test_mul_against_vectors();
    test_montgomery_vectors();
    test_public_modexp_vectors();
    return 0;
}
```

Every test name should correspond to an invariant from the articles: carry propagation, borrow relation, product bound, REDC cancellation, or exponentiation invariant.

## Production boundary

This series is a design for an auditable primitive layer. Production cryptographic libraries also need:

- platform-specific assembly or verified intrinsics;
- continuous side-channel testing;
- fault and invalid-input policy;
- secure zeroization where secrets are stored;
- formal review of compiler output;
- protocol-level validation above the arithmetic layer.

A minimal C bignum library can be correct and useful for research, tests, and education. Shipping it in hostile environments requires a separate hardening project.

## SageMath end-to-end check

```python
p = 2^127 - 1
R = 2^(32*4)
x, y = 123456789, 987654321
print((x*y) % p == (x * R % p) * (y * R % p) * inverse_mod(R, p)^2 % p)
print(power_mod(x, 65537, p) == pow(x, 65537, p))
```

The final implementation should generate C vectors from this model and round-trip them through the compiled test binary.

<nav class="bn-nav">
  <a href="/articles/bn-12-constant-time-and-c-security/"><span>Previous</span>Bignum Arithmetic 12: Constant-Time C and Security Boundaries</a>
</nav>

</article>
