---
title: "Bignum Arithmetic 00: Roadmap for Cryptographic Integers"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: limbs, radix, C implementation, public-key cryptography, verification
short: "A roadmap from limb representation to modular arithmetic and constant-time C."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-00" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 00</p>

# Roadmap for cryptographic integers

<p class="bn-deck">A public-key primitive eventually reduces to arithmetic on arrays of machine words. The design problem is to make every carry, reduction, and memory access justify itself.</p>
</header>

These notes fix the implementation target before the algorithms: C with fixed-width unsigned integer types no wider than 32 bits, using `uint16_t` limbs and `uint32_t` double-limb accumulators. SageMath remains the executable specification. The intended caller is cryptographic code: RSA exponentiation, finite-field Diffie-Hellman, elliptic-curve scalar multiplication, and support arithmetic for post-quantum implementations.
The companion [elliptic arithmetic series](/articles/ec-00-roadmap/) starts where this series ends: prime-field operations become point operations, and Montgomery/lazy range contracts become preconditions for curve formulas.

The bignum layer is not a general computer-algebra system. Its job is narrower: represent nonnegative integers with predictable limb arrays, implement arithmetic with stated bounds, and expose constant-time variants where secrets influence values.

## Global representation

Let $$w=16$$ be the baseline limb width and $$B=2^w$$. For an array $$a=(a_0,\ldots,a_{n-1})$$ with $$0\le a_i<B$$, define

$$
\operatorname{val}_B(a)=\sum_{i=0}^{n-1} a_iB^i.
$$

This is a mathematical definition, not a C layout accident. The C array is little-endian because carry propagation starts at the least significant word.

<div class="bn-env" markdown="1">
<span class="bn-env-title">Core invariants</span>

1. Every arithmetic limb has type `uint16_t`, every scalar accumulator has type `uint32_t`, and each limb stores a value in $$[0,B)$$ with $$B=2^{16}$$.
2. A routine that returns an $$n$$-limb result must state whether it is canonical, reduced, or allowed to be lazy.
3. A routine that may overflow $$n$$ limbs returns the carry, borrow, or high limb explicitly.
4. Secret-dependent branches and secret-dependent table indices are forbidden in constant-time routines.
</div>

## Route through the series

| Articles | Purpose |
|---|---|
| 01-02 | Define limbs, unsigned C arithmetic, comparison, addition, subtraction, and masks. |
| 03-04 | Build multiplication and squaring from convolution with accumulator bounds. |
| 05-08 | Turn integer arithmetic into reduction algorithms: division, modular add/sub, Montgomery, Barrett, and pseudo-Mersenne. |
| 09-10 | Use modular multiplication for exponentiation and prime-field arithmetic. |
| 11-13 | Test, fuzz, harden, and assemble a minimal cryptographic bignum API. |

The mathematical dependency is strict. Montgomery reduction is unreadable until the limb value map and carry invariant are fixed; constant-time exponentiation is unsafe until conditional move and table selection are defined.

## Example: RSA modulus arithmetic

For a 2048-bit RSA modulus under the 32-bit-only profile, choose $$w=16$$ and $$n=128$$. A residue is an array of 128 limbs. A product before reduction has at most 256 limbs because

$$
0\le ab < m^2 < B^{256}.
$$

Montgomery multiplication therefore needs a temporary of at least $$2n+1$$ limbs and a proof that the inner multiply-add step never overflows its accumulator.

## Example: a 255-bit prime field

For $$p=2^{255}-19$$ under this profile, a uniform representation uses sixteen 16-bit limbs, with the top bit unused for canonical residues. Specialized field code may choose another representation, but it must still prove that every product, carry, and fold is represented by 32-bit C objects only.

## SageMath as oracle

SageMath is used to generate exact expected values, not to justify C behavior. C behavior must be proved from the C type rules and word bounds.

```python
B = 2^16
limbs = [0xffff, 0, 7]
x = sum(limbs[i] * B^i for i in range(len(limbs)))
print(x == 7*B^2 + B - 1)
```

<div class="bn-warning" markdown="1">
<span class="bn-env-title">Cryptographic warning</span>

A correct bignum routine can still be cryptographically wrong. If a secret exponent controls a branch, if a secret limb controls a memory index, or if an invalid input exits early with distinguishable timing, the public-key theorem using the arithmetic no longer matches the implementation.
</div>

<nav class="bn-nav">
  <span></span>
  <a class="bn-next" href="/articles/bn-01-limbs-radix-and-word-size/"><span>Next</span>Bignum Arithmetic 01: Limbs, Radix, and Word Size</a>
</nav>

</article>
