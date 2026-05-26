---
title: "Bignum Arithmetic 01: Limbs, Radix, and Word Size"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: radix 2^w, uint32_t, half-word products, overflow bounds
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

| Public word type | Mathematical radix | Product representation | Portable status |
|---|---:|---|---|
| `uint32_t` | $$2^{32}$$ | two `uint32_t` words from four 16-by-16 products | teaching model |
| 16-bit half-word value | $$2^{16}$$ | one `uint32_t` product | internal multiplication device, not the public limb type |

Unsigned overflow is defined modulo $$2^{32}$$ for `uint32_t`. Signed overflow is undefined behavior. Therefore word arithmetic uses unsigned types only. A cast or assignment to `uint32_t` is low-word extraction; a 32-by-32 product is represented by explicit low and high words rather than by a wider C type.

<div class="bn-proof" markdown="1">
<span class="bn-env-title">Product bound</span>

If $$0\le x,y<B=2^w$$, then

$$
xy\le (B-1)^2=B^2-2B+1<B^2.
$$

So a single product fits in an unsigned type of at least $$2w$$ value bits. With the series choice $$w=32$$, no allowed C type can hold the whole product. The implementation therefore represents the product as two `uint32_t` words, obtained by splitting each input word into 16-bit halves.
</div>

## Little-endian limbs

Little-endian limb order means `a[0]` is the least significant limb. Addition then has the invariant

$$
\sum_{j=0}^{i-1} r_jB^j + c_iB^i
=\sum_{j=0}^{i-1}(a_j+b_j)B^j,
$$

where $$c_i\in\{0,1\}$$ is the carry into limb $$i$$.

Big-endian byte serialization is a separate API layer. Mixing serialization order with arithmetic order is a common source of off-by-one and endian bugs.

## Example: exact 32-by-32 multiply from half-words

For `uint32_t x, y`, write

$$
x=x_0+x_1 2^{16},\qquad y=y_0+y_1 2^{16},\qquad 0\le x_i,y_i<2^{16}.
$$

The product is represented as `hi:lo`, two 32-bit words:

```c
#include <stdint.h>

typedef uint32_t limb_t;
enum { BN_WORD_BITS = 32, BN_HALF_BITS = 16, BN_HALF_MASK = 0xffffu };

static void bn_mul_word(limb_t x, limb_t y, limb_t *lo, limb_t *hi) {
    limb_t x0 = x & BN_HALF_MASK;
    limb_t x1 = x >> BN_HALF_BITS;
    limb_t y0 = y & BN_HALF_MASK;
    limb_t y1 = y >> BN_HALF_BITS;

    limb_t p00 = x0 * y0;
    limb_t p01 = x0 * y1;
    limb_t p10 = x1 * y0;
    limb_t p11 = x1 * y1;
    limb_t mid = (p00 >> BN_HALF_BITS)
               + (p01 & BN_HALF_MASK)
               + (p10 & BN_HALF_MASK);

    *lo = (p00 & BN_HALF_MASK) | ((mid & BN_HALF_MASK) << BN_HALF_BITS);
    *hi = p11 + (p01 >> BN_HALF_BITS) + (p10 >> BN_HALF_BITS)
        + (mid >> BN_HALF_BITS);
}
```

Every multiplication above is a 16-by-16 product below $$2^{32}$$. The shift counts are strictly smaller than 32, and the final high word is less than $$2^{32}$$ by the half-word product bound.

## SageMath bound check

```python
for w in [16, 32]:
    B = 2^w
    print((B - 1)^2 < B^2)
    print((B - 1) + (B - 1) + 1 < 2*B)

# Maximal 32-by-32 product represented by two 32-bit words.
x = y = 2^32 - 1
lo = (x*y) % 2^32
hi = (x*y) // 2^32
print(hex(lo), hex(hi))
```

This confirms the inequalities, but the C proof still depends on the actual type widths. A build should assert them.

```c
#include <stdint.h>
#include <limits.h>

_Static_assert(CHAR_BIT == 8, "this code assumes 8-bit bytes");
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
