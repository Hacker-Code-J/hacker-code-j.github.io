---
title: "Elliptic Arithmetic 08: Curve Validation and Subgroups"
layout: page
categories: Computing
tags: [elliptic-arithmetic, validation, subgroups, cryptography]
topics: point validation, subgroup order, cofactor, invalid-curve attacks, public keys
short: "Point validation, subgroup checks, cofactors, and invalid-curve attack boundaries."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-08" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 08</p>

# Curve validation and subgroups

<p class="ec-deck">Public points are attacker-controlled data. A group operation on an unvalidated point is often a protocol bug, not just an arithmetic bug.</p>
</header>

Chapter 4 of the reference book emphasizes domain parameters and public-key validation because elliptic-curve protocols rely on a prime-order subgroup, not merely on the curve equation.

## Domain parameters

For a short-Weierstrass prime-field curve, parameters include

$$
(p,a,b,G,n,h),
$$

where $$G$$ has prime order $$n$$ and $$\#E(\mathbb F_p)=nh$$. The cofactor $$h$$ is usually small.

## Public point validation

For a decoded affine public point $$Q=(x,y)$$:

1. reject invalid encodings and noncanonical field elements;
2. reject infinity unless the protocol explicitly permits it;
3. check $$y^2=x^3+ax+b$$;
4. check subgroup membership, commonly $$[n]Q=\mathcal O$$ or a validated equivalent.

For a domain parameter set with prime base-point order $$n$$ and cofactor $$h=1$$, the on-curve check plus non-infinity already puts a point in the prime-order group because $$\#E(\mathbb F_p)=n$$. This is the P-256 situation. For $$h>1$$, or when the full curve order is not the prime order used by the protocol, the subgroup condition is a separate security condition, not a cosmetic extra.

```c
uint32_t p256_validate_public(const p256_affine_t *q) {
    if (q->infinity != 0u) return 0u;
    if (p256_affine_on_curve(q) == 0u) return 0u;
    return 1u; /* P-256 has cofactor 1; other curves may need an explicit subgroup check. */
}
```

## Invalid-curve and small-subgroup failures

If a scalar multiplication accepts arbitrary points, an attacker may send a point on another curve or in a small subgroup. Repeated interactions can reveal information about a secret scalar modulo small factors.

<div class="ec-example" markdown="1">
<span class="ec-env-title">Example: small subgroup</span>

If $$h=4$$ and an implementation skips subgroup checks, an attacker may choose a point $$T$$ of order 4. The result $$[d]T$$ reveals $$d\bmod 4$$. Several such leaks can combine by the Chinese remainder theorem.
</div>

<div class="ec-example" markdown="1">
<span class="ec-env-title">Example: invalid curve</span>

The addition formulas for $$y^2=x^3+ax+b$$ do not depend on $$b$$ in the same way validation does. A malicious point satisfying another equation with the same $$a$$ can pass through formulas unless the implementation checks the actual curve.
</div>

## SageMath validation check

```python
p = 17
E = EllipticCurve(GF(p), [1, 4])
n, h = 7, 2
G = E(4, 2)   # prime-order base point
T = E(3, 0)   # on-curve point of order 2
print(E.order() == n*h)
print(G in E, G.order(), n*G == E(0))
print(T in E, T.order(), n*T == E(0))
```

The point `T` passes the curve equation but fails the prime-subgroup check because `n*T` is not infinity. That is the distinction validation must preserve.

## Protocol boundary

The arithmetic library can provide `validate_public`. The protocol must decide when to call it. ECDH usually requires public-key validation or a cofactor-clearing design with a precise proof. ECDSA verification requires validating the public key before trusting verification results.

<nav class="ec-nav">
  <a href="/articles/ec-07-side-channel-safe-group-operations/"><span>Previous</span>Elliptic Arithmetic 07: Side-Channel Safe Group Operations</a>
  <a class="ec-next" href="/articles/ec-09-standard-curves-and-parameters/"><span>Next</span>Elliptic Arithmetic 09: Standard Curves and Parameters</a>
</nav>

</article>

