---
title: "Bignum Arithmetic 12: Constant-Time C and Security Boundaries"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: constant-time C, undefined behavior, side channels, API design
short: "Undefined behavior, branches, memory access, compiler hazards, and API discipline."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-12" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 12</p>

# Constant-time C and security boundaries

<p class="bn-deck">The arithmetic theorem says what value is computed. The side-channel theorem asks what the execution trace reveals.</p>
</header>

A bignum function used on secrets should have control flow and memory access independent of secret data. This is a stricter requirement than mathematical correctness.

The same leakage contract reappears in [elliptic scalar multiplication](/articles/ec-06-scalar-multiplication/) and [side-channel safe group operations](/articles/ec-07-side-channel-safe-group-operations/), where secret scalar bits control point operations unless the implementation prevents it.

## C hazards

| Hazard | Rule |
|---|---|
| signed overflow | never use signed types for limb arithmetic |
| shift by word size | invalid in C, even for unsigned types |
| strict aliasing | avoid type-punning limb arrays |
| variable-length secret loops | fix loop bounds by public sizes |
| secret table index | scan and mask-select |
| early exit comparison | only for public inputs |

## Example: bad comparison

```c
int bn_cmp_public(const limb_t *a, const limb_t *b, uint32_t n) {
    for (uint32_t i = n; i-- > 0;) {
        if (a[i] > b[i]) return 1;
        if (a[i] < b[i]) return -1;
    }
    return 0;
}
```

This is fine for public moduli or public encodings. It is not fine if `a` and `b` are secret values, because the first differing limb leaks.

## Example: masked table lookup

```c
static uint32_t ct_eq_u32(uint32_t x, uint32_t y) {
    uint32_t z = x ^ y;
    z |= 0u - z;
    return (z >> 31) ^ 1u;
}

void table_select(limb_t *r, const limb_t *table,
                  uint32_t rows, uint32_t n, uint32_t idx) {
    for (uint32_t j = 0; j < n; j++) r[j] = 0;
    for (uint32_t i = 0; i < rows; i++) {
        uint32_t eq = ct_eq_u32(i, idx);
        uint32_t mask = 0u - eq;
        for (uint32_t j = 0; j < n; j++) {
            r[j] = (limb_t)(r[j] | (table[i*n + j] & mask));
        }
    }
}
```

Precondition: `idx < rows`, `rows` is public, and `idx` has already been reduced to the table range. Out-of-range indices must be rejected or normalized before this helper is called.
The source has fixed memory traversal. Whether the compiler preserves the intended constant-time behavior is a toolchain and audit question.

## Undefined behavior boundary

Unsigned arithmetic wraps modulo $$2^w$$. That is defined. But these are undefined or invalid:

```c
int32_t s = INT32_MAX;
s = s + 1;          /* undefined */
uint32_t x = 1;
x <<= 32;           /* invalid shift when width is 32 */
```

A proof over $$\mathbb Z/2^w\mathbb Z$$ only applies to C operations that actually implement that ring.

## Compiler boundary

Compilers optimize under the C abstract machine, not the cryptographic leakage model. A source-level branchless idiom can still compile into a branch on some targets, and a memory wipe can be removed if the compiler proves the bytes are dead.

Use disassembly, constant-time analysis tools, or verified primitives for high-assurance deployments.

## API design

Separate functions by leakage contract:

```c
int bn_cmp_public(const limb_t *a, const limb_t *b, uint32_t n);
void bn_sub_secret(limb_t *r, const limb_t *a, const limb_t *b, uint32_t n);
void bn_select_secret(limb_t *r, const limb_t *x, const limb_t *y, uint32_t n, uint32_t bit);
```

Names should make misuse harder. Do not hide variable-time behavior behind a neutral name such as `bn_cmp` when callers may pass secrets.

## Mathematical correctness is not enough

If RSA exponentiation branches on private exponent bits, the output is still $$m^d\bmod N$$. The arithmetic theorem is true, while the implementation leaks the exponent. Cryptographic correctness is a conjunction of value correctness, input validation, randomness conditions, and leakage constraints.

<nav class="bn-nav">
  <a href="/articles/bn-11-testing-verification-and-fuzzing/"><span>Previous</span>Bignum Arithmetic 11: Testing, Verification, and Fuzzing</a>
  <a class="bn-next" href="/articles/bn-13-minimal-cryptographic-bignum-library/"><span>Next</span>Bignum Arithmetic 13: A Minimal Cryptographic Bignum Library</a>
</nav>

</article>
