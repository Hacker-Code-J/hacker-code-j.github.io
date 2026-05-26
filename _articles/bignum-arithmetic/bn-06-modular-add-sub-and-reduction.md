---
title: "Bignum Arithmetic 06: Modular Add, Subtract, and Reduction"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: modular addition, modular subtraction, conditional subtraction, lazy reduction
short: "Residue range invariants, conditional subtraction, and lazy reduction."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-06" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 06</p>

# Modular add, subtract, and reduction

<p class="bn-deck">Fast modular arithmetic is mostly range management. Every routine must say which interval its output occupies.</p>
</header>

Fix an odd modulus $$m$$ with $$0<m<B^n$$. A canonical residue satisfies $$0\le x<m$$. A lazy residue may satisfy a wider bound such as $$0\le x<2m$$.

## Modular addition

For canonical inputs $$a,b<m$$,

$$
0\le a+b<2m.
$$

So one subtraction of $$m$$ suffices to canonicalize.

```c
#define BN_MAX_LIMBS 256

void bn_mod_add(limb_t *r, const limb_t *a, const limb_t *b,
                const limb_t *m, uint32_t n) {
    limb_t tmp[BN_MAX_LIMBS];
    uint32_t carry = bn_add_n(r, a, b, n);
    uint32_t borrow = bn_sub_n(tmp, r, m, n);
    uint32_t use_tmp = carry | (borrow ^ 1u);
    bn_cmov(r, tmp, r, n, use_tmp);
}
```

The scratch sizing above is schematic. A real fixed-size library should enforce `n <= BN_MAX_LIMBS` at API entry, encode the maximum limb count in the type, or pass scratch space from the caller.

## Modular subtraction

If $$a,b<m$$, compute $$a-b$$. If it borrows, add $$m$$ back.

$$
r=\begin{cases}
a-b,&a\ge b,\\
a-b+m,&a<b.
\end{cases}
$$

This returns a canonical residue because $$-(m-1)\le a-b\le m-1$$.

## Constant-time conditional subtraction

A common canonicalization step is: compute $$x-m$$ and keep it if no borrow occurred.

```c
#define BN_MAX_LIMBS 256

void bn_cond_sub(limb_t *x, const limb_t *m, uint32_t n) {
    limb_t tmp[BN_MAX_LIMBS];
    uint32_t borrow = bn_sub_n(tmp, x, m, n);
    bn_cmov(x, tmp, x, n, borrow ^ 1u);
}
```

For production code, avoid fixed scratch arrays hidden inside generic routines unless the maximum size is part of the API contract and every entry point checks it before writing scratch limbs.

This helper assumes the value to canonicalize is already represented in exactly `n` limbs. If an operation also returns a carry or high limb, that extra bit must be part of the selection condition; otherwise the low limbs may appear below `m` while the mathematical value is still at least $$B^n$$.

<div class="bn-proof" markdown="1">
<span class="bn-env-title">One-subtraction proof</span>

If $$0\le a,b<m$$, then $$0\le s=a+b<2m$$. Mathematically, $$s$$ is either already in $$[0,m)$$ or $$s-m$$ is. In an $$n$$-limb implementation, compute the low limbs of $$s$$ and the carry bit. Select the subtracted result when the carry is 1 or when subtracting $$m$$ from the low limbs does not borrow. This implements the same one-subtraction proof even when $$s\ge B^n$$.
</div>

## Example: carry from limb width but not from modulus range

Let $$m=B^n-17$$ and $$a=b=m-1$$. Then $$a+b=2B^n-36$$. The low $$n$$ limbs are $$B^n-36$$ and the carry is 1. The carry must force selection of the subtracted result, because the mathematical sum exceeded $$B^n$$ even though the low limbs may appear below $$m$$.

## Example: lazy range in elliptic-curve formulas

A field implementation may allow $$0\le x<2p$$ between additions to save reductions. If a later multiplication assumes canonical input, the interface is broken. Lazy reduction is a performance contract, not an informal convenience.

## SageMath range test

```python
B = 2^32
n = 4
m = B^n - 189
for a in [0, 1, m-1, m//2]:
    for b in [0, 2, m-1, m//3]:
        s = a + b
        r = s - m if s >= m else s
        print(0 <= r < m and r == (a + b) % m)
```

<nav class="bn-nav">
  <a href="/articles/bn-05-division-reduction-and-normalization/"><span>Previous</span>Bignum Arithmetic 05: Division, Reduction, and Normalization</a>
  <a class="bn-next" href="/articles/bn-07-montgomery-arithmetic/"><span>Next</span>Bignum Arithmetic 07: Montgomery Arithmetic</a>
</nav>

</article>
