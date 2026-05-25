---
title: "Bignum Arithmetic 01: Limbs, Radix, and Word Size"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: radix 2^w, uint16_t, uint32_t, overflow bounds
short: "The value map, limb order, unsigned C arithmetic, and exact accumulator bounds."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-01" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 01</p>

# Limbs, radix, and word size

<p class="bn-deck">Before writing a single carry loop, fix the radix, the value map, and the C types whose overflow behavior is actually defined.</p>
</header>

Let $$B=2^w$$. A limb is an unsigned integer type that can represent exactly $$0,\ldots,B-1$$. The value of an $$n$$-limb vector is

$$
[a]_{B,n}=a_0+a_1B+\cdots+a_{n-1}B^{n-1}.
$$

The representation is canonical for length $$n$$ when each limb is reduced modulo $$B$$. It is not unique as an integer representation because leading zero limbs can be appended.

## C type contract

| Limb type | Radix | Product accumulator | Portable status |
|---|---:|---|---|
| `uint8_t` | $$2^8$$ | `uint16_t` | useful for tiny tests |
| `uint16_t` | $$2^{16}$$ | `uint32_t` | baseline for this 32-bit-only series |
| `uint32_t` | $$2^{32}$$ | two-word product | not used as a limb here because one product needs twice as many value bits |

Unsigned overflow is defined modulo $$2^w$$ for the unsigned type width. Signed overflow is undefined behavior. Therefore limb arithmetic uses unsigned types only, and conversion from a wider unsigned accumulator to a limb is an intentional low-word extraction.

<div class="bn-proof" markdown="1">
<span class="bn-env-title">Product bound</span>

If $$0\le x,y<B=2^w$$, then

$$
xy\le (B-1)^2=B^2-2B+1<B^2.
$$

So a single product fits in an unsigned type of at least $$2w$$ value bits. With the series choice $$w=16$$, `uint32_t` is sufficient. A 32-bit limb would need a two-word mathematical product, so it is not the baseline implementation.
</div>

## Little-endian limbs

Little-endian limb order means `a[0]` is the least significant limb. Addition then has the invariant

$$
\sum_{j=0}^{i-1} r_jB^j + c_iB^i
=\sum_{j=0}^{i-1}(a_j+b_j)B^j,
$$

where $$c_i\in\{0,1\}$$ is the carry into limb $$i$$.

Big-endian byte serialization is a separate API layer. Mixing serialization order with arithmetic order is a common source of off-by-one and endian bugs.

## Example: exact 16-by-16 multiply

For `uint16_t x, y`, define

$$
xy=\ell+hB,
\qquad 0\le \ell,h<B,
\qquad B=2^{16}.
$$

A `uint32_t` accumulator gives both halves without using any wider C type:

```c
#include <stdint.h>

typedef uint16_t limb_t;
typedef uint32_t dlimb_t;
enum { BN_LIMB_BITS = 16 };

static inline limb_t lo_limb(dlimb_t x) { return (limb_t)x; }
static inline limb_t hi_limb(dlimb_t x) { return (limb_t)(x >> BN_LIMB_BITS); }
```

The cast to `limb_t` is not a bug; it is reduction modulo $$B$$, exactly the low limb.

## Example: why the baseline does not use 32-bit limbs

If a limb stored values modulo $$2^{32}$$, then one product could be as large as

$$
(2^{32}-1)^2<2^{2\cdot 32}.
$$

That product can still be represented with two `uint32_t` words, but every multiply-add routine must become a multiword arithmetic routine. The baseline therefore uses $$w=16$$: one product plus one output limb plus one carry fits in a single `uint32_t`.

## SageMath bound check

```python
for w in [8, 16]:
    B = 2^w
    print((B - 1)^2 < B^2)
    print((B - 1) + (B - 1) + 1 < 2*B)
```

This confirms the inequalities, but the C proof still depends on the actual type widths. A build should assert them.

```c
#include <stdint.h>
#include <limits.h>

_Static_assert(CHAR_BIT == 8, "this code assumes 8-bit bytes");
_Static_assert(sizeof(uint16_t) * CHAR_BIT == 16, "uint16_t must be 16 bits");
_Static_assert(sizeof(uint32_t) * CHAR_BIT == 32, "uint32_t must be 32 bits");
```

## Preconditions and postconditions

For every fixed-length arithmetic function, record:

- precondition: inputs are arrays of length $$n$$ with limbs in $$[0,B)$$;
- postcondition: output limbs are in $$[0,B)$$;
- value relation: output value plus an explicit carry equals the mathematical result;
- side-channel class: variable-time, public-input constant-time, or secret-input constant-time.

<nav class="bn-nav">
  <a href="/articles/bn-00-roadmap/"><span>Previous</span>Bignum Arithmetic 00: Roadmap for Cryptographic Integers</a>
  <a class="bn-next" href="/articles/bn-02-addition-subtraction-and-comparison/"><span>Next</span>Bignum Arithmetic 02: Addition, Subtraction, and Comparison</a>
</nav>

</article>
