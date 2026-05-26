---
title: "Bignum Arithmetic 10: Prime-Field Arithmetic"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: prime fields, finite-field arithmetic, inversion, elliptic curves
short: "Field representation, inversion, and cryptographic prime examples."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-10" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 10</p>

# Prime-field arithmetic

<p class="bn-deck">A prime-field layer is a bignum layer with a stronger invariant: every operation is interpreted modulo one fixed prime.</p>
</header>

For prime $$p$$, the field $$\mathbb F_p$$ consists of residue classes modulo $$p$$. The implementation chooses a representation: canonical limbs, Montgomery residues, or a specialized radix.

## Field element contract

For a canonical representation:

- input: $$0\le a,b<p$$;
- add/sub: return $$0\le r<p$$;
- multiply/square: return $$0\le r<p$$;
- inversion: if $$a\ne0$$, return $$a^{-1}\bmod p$$.

For Montgomery representation, the stored value of $$x$$ is $$xR\bmod p$$. The API must make this invisible or explicit, but never ambiguous.

This is the field contract consumed by [elliptic curve equations](/articles/ec-01-fields-and-curve-equations/) and the [elliptic field interface](/articles/ec-05-field-arithmetic-interface/): point formulas are only valid when their field inputs satisfy the promised canonical or lazy ranges.

## Inversion by Fermat

Since $$p$$ is prime,

$$
a^{p-1}=1\quad(a\ne0),
\qquad a^{-1}=a^{p-2}\pmod p.
$$

This uses modular exponentiation and can be made regular with a fixed addition chain for a fixed prime.

## Inversion by extended Euclid

The extended Euclidean algorithm finds $$u,v$$ such that

$$
ua+vp=\gcd(a,p)=1.
$$

Then $$u\bmod p$$ is the inverse. Classical Euclid is variable-time; constant-time variants require careful bounded iteration.

## Example: P-256 prime

For $$p=2^{256}-2^{224}+2^{192}+2^{96}-1$$, reduction can exploit the sparse relation defining $$2^{256}$$ modulo $$p$$. The teaching implementation keeps the first version auditable: field elements are eight little-endian `uint32_t` words, and a word product is decomposed into 16-bit halves before it is accumulated.

```c
typedef uint32_t fe_word_t;
typedef struct { fe_word_t v[8]; } fe_p256;
```

This type has mathematical radix $$B=2^{32}$$. Its multiplication proof is the 32-by-32 decomposition from the schoolbook multiplication article.

## Example: Curve25519-style prime

For $$p=2^{255}-19$$ in the same 32-bit-word model, a uniform implementation can use eight `uint32_t` words. The high bit of the top word is unused for canonical residues, and reduction must fold the excess using only bounded shifts, additions, and the small public multiplier 19.

```c
typedef struct { uint32_t v[8]; } fe_25519;
```

## C API boundary

```c
void fe_add(fe_p256 *r, const fe_p256 *a, const fe_p256 *b);
void fe_mul(fe_p256 *r, const fe_p256 *a, const fe_p256 *b);
void fe_sqr(fe_p256 *r, const fe_p256 *a);
void fe_inv(fe_p256 *r, const fe_p256 *a);
void fe_to_mont(fe_p256 *r, const fe_p256 *a);
void fe_from_mont(fe_p256 *r, const fe_p256 *a);
void fe_mont_mul(fe_p256 *r, const fe_p256 *a, const fe_p256 *b);
```

The type fixes the modulus and word count. That is safer than a generic `(limbs, n, modulus)` interface in elliptic-curve code.

## SageMath verification

```python
p = 2^256 - 2^224 + 2^192 + 2^96 - 1
F = GF(p)
def words(x):
    return [hex((Integer(x) >> (32*i)) & 0xffffffff) for i in range(8)]
for a in [1, 2, 19, p-2]:
    inv = power_mod(a, p-2, p)
    print(words(inv))
    print((a * inv) % p == 1)
```

## Cryptographic warning

Reject noncanonical encodings at API boundaries when the protocol requires canonical encodings. Accepting multiple encodings of the same field element can break transcript binding, signature verification, or subgroup checks.

<nav class="bn-nav">
  <a href="/articles/bn-09-modular-exponentiation/"><span>Previous</span>Bignum Arithmetic 09: Modular Exponentiation</a>
  <a class="bn-next" href="/articles/bn-11-testing-verification-and-fuzzing/"><span>Next</span>Bignum Arithmetic 11: Testing, Verification, and Fuzzing</a>
</nav>

</article>
