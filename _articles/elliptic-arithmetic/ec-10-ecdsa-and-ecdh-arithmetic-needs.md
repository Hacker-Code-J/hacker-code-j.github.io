---
title: "Elliptic Arithmetic 10: ECDSA and ECDH Arithmetic Needs"
layout: page
categories: Computing
tags: [elliptic-arithmetic, ECDSA, ECDH, cryptography]
topics: signatures, key agreement, nonce sensitivity, protocol boundary
short: "What ECDSA and ECDH require from the arithmetic layer and what remains protocol work."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-10" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 10</p>

# ECDSA and ECDH arithmetic needs

<p class="ec-deck">Protocols are not just calls to scalar multiplication. They add nonce rules, public-key validation, integer reductions, encoding, and failure behavior.</p>
</header>

The reference book presents ECDSA, ECIES, and key establishment after curve arithmetic because these schemes consume the arithmetic layer. This article records what the arithmetic library must provide and what it must not silently decide.

## ECDSA signing

ECDSA signing computes $$R=[k]G=(x_1,y_1)$$ and

$$
r=x_1\bmod n,\qquad s=k^{-1}(e+dr)\bmod n.
$$

The protocol retries if $$r=0$$ or $$s=0$$. Those cases are rare for a correct prime-order subgroup, but omitting the checks changes the signature algorithm and can create edge-case forgeries or interoperability failures.

The nonce $$k$$ is as sensitive as the private key. If one nonce leaks,

$$
d=r^{-1}(ks-e)\bmod n.
$$

If a nonce repeats for two messages, the private key can be recovered. The arithmetic layer must provide constant-time scalar multiplication for $$[k]G$$ and scalar-field inversion/multiplication modulo $$n$$, but nonce generation is a protocol responsibility.

## ECDSA verification

Verification computes

$$
u_1=es^{-1}\bmod n,\qquad u_2=rs^{-1}\bmod n,\qquad X=[u_1]G+[u_2]Q.
$$

The scalars are public, but the public key $$Q$$ must be validated. A faster public multi-scalar routine may be separate from the secret scalar routine.

## ECDH

Basic ECDH computes $$Z=[d]Q$$ with secret $$d$$ and public peer point $$Q$$. The arithmetic layer must support:

1. public point validation or a documented cofactor-clearing construction;
2. constant-time multiplication by the private scalar;
3. well-defined handling of infinity and malformed encodings.

The KDF and transcript binding are above the arithmetic layer.

## Two concrete failures

**Nonce reuse.** If signatures $$(r,s_1)$$ and $$(r,s_2)$$ reuse the same nonce, then

$$
k=(e_1-e_2)(s_1-s_2)^{-1}\bmod n.
$$

The arithmetic functions may be perfect, but the system fails.

**Missing validation in ECDH.** If `ecdh(d, Q)` accepts an invalid point, an attacker can make the output depend on $$d$$ modulo small values. This is not repaired by a correct field multiplier.

## SageMath toy ECDSA relation

```python
n = 101
d, k, e = 37, 29, 44
r = 17
s = inverse_mod(k, n) * (e + d*r) % n
print(s)
print((inverse_mod(r, n) * (k*s - e)) % n == d)
```

<nav class="ec-nav">
  <a href="/articles/ec-09-standard-curves-and-parameters/"><span>Previous</span>Elliptic Arithmetic 09: Standard Curves and Parameters</a>
  <a class="ec-next" href="/articles/ec-11-testing-with-sagemath/"><span>Next</span>Elliptic Arithmetic 11: Testing with SageMath</a>
</nav>

</article>

