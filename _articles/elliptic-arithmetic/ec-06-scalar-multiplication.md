---
title: "Elliptic Arithmetic 06: Scalar Multiplication"
layout: page
categories: Computing
tags: [elliptic-arithmetic, scalar-multiplication, C]
topics: double-and-add, Montgomery ladder, fixed window, loop invariants
short: "Scalar multiplication algorithms, invariants, and constant-time table structure."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-06" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 06</p>

# Scalar multiplication

<p class="ec-deck">Scalar multiplication is where algebra meets leakage: the loop invariant is mathematical, but the branch pattern is cryptographic.</p>
</header>

Given $$k$$ and $$P\in E(\mathbb F_p)$$, compute $$[k]P$$. The book treats this as the dominant operation in ECC schemes and presents binary, NAF, window, fixed-base, and multiple-point methods.

## Binary double-and-add

Left-to-right binary multiplication maintains the invariant:

after processing a bit prefix $$u$$ of $$k$$, the accumulator is $$Q=[u]P$$.

For the next bit $$b$$,

$$
Q\leftarrow [2u]P,\qquad
Q\leftarrow [2u+b]P.
$$

This proves correctness, but a branch on $$b$$ leaks scalar bits.

## Ladder-style constant-time shape

For a short-Weierstrass implementation with incomplete addition formulas, do not merely write "Montgomery ladder" and assume safety. A useful invariant is still

$$
R_0=[u]P,\qquad R_1=[u+1]P,
$$

but the update must be implemented with formulas that are valid for all states reached by the loop, or by computing both possible updates and selecting by masks:

```c
for (uint32_t i = scalar_bits; i-- > 0;) {
    ec_jac_t d0, d1, s;
    uint32_t bit = scalar_get_bit(k, i);
    ec_double(&d0, &r0);       /* [2u]P */
    ec_add(&s, &r0, &r1);      /* [2u+1]P */
    ec_double(&d1, &r1);       /* [2u+2]P */
    ec_jac_select(&r0, &d0, &s, bit);
    ec_jac_select(&r1, &s, &d1, bit);
}
```

This is a constant-operation-count pattern, not automatically a complete implementation. The proof must still show that `ec_add` is valid for the pair `(r0,r1)` in every iteration, or replace it with complete formulas for the chosen curve model. Montgomery curves such as Curve25519 have their own x-coordinate ladder formulas; those are not the same as generic short-Weierstrass Jacobian addition.

## Fixed-window multiplication

For public fixed base $$G$$, precompute odd multiples or a comb table. For secret scalars, the table lookup must scan every entry:

```c
static uint32_t ct_eq_u32(uint32_t x, uint32_t y) {
    uint32_t z = x ^ y;
    z |= 0u - z;
    return (z >> 31) ^ 1u;
}

static void ec_select_table(ec_jac_t *r, const ec_jac_t table[], uint32_t len, uint32_t idx) {
    ec_jac_set_infinity(r);
    for (uint32_t i = 0; i < len; i++) {
        uint32_t take = ct_eq_u32(i, idx);
        ec_jac_cmov(r, &table[i], take);
    }
}
```


Precondition: `idx < len`, `len` is public, and the window value has already been reduced to the table range. The helper is a selector, not an input validator.

## Signed digits and NAF

A non-adjacent form writes a scalar as

$$
k=\sum_i u_i2^i,\qquad u_i\in\{0,\pm 1\}
$$

with no two adjacent nonzero digits in the width-2 case. Wider signed-window variants use odd digits such as `+/-1`, `+/-3`, ..., `+/-(2^{w-1}-1)`. The benefit is fewer additions; the cost is a signed table and one more proof obligation. Selecting `P` versus `-P` cannot branch on a secret digit, and negation must be represented as a constant-time conditional replacement of `Y` by `-Y`.

For example, `13` has ordinary NAF digits `1,0,-1,0,1` from low to high, namely `13 = 1 - 4 + 16`. For a width-4 signed window, a table of odd positive multiples can be reused for negative digits only if sign handling and table selection are constant-time.

## Two examples

For $$k=13=(1101)_2$$, binary left-to-right performs:

$$
\mathcal O \to P \to 2P+P=3P \to 6P \to 12P+P=13P.
$$

For width-4 fixed-window multiplication, a 256-bit scalar uses 64 windows. The loop count is public. The selected table entry per window is secret, so the selection must be a full scan or use another constant-time mechanism.

## SageMath scalar checks

```python
p = 17
E = EllipticCurve(GF(p), [2, 2])
P = E(5, 1)
for k in [0, 1, 2, 13, 37]:
    print(k, k*P)
print(13*P == sum([P for _ in range(13)], E(0)))
```

<nav class="ec-nav">
  <a href="/articles/ec-05-field-arithmetic-interface/"><span>Previous</span>Elliptic Arithmetic 05: Field Arithmetic Interface</a>
  <a class="ec-next" href="/articles/ec-07-side-channel-safe-group-operations/"><span>Next</span>Elliptic Arithmetic 07: Side-Channel Safe Group Operations</a>
</nav>

</article>

