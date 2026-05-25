---
title: "Elliptic Arithmetic 01: Fields and Curve Equations"
layout: page
categories: Computing
tags: [elliptic-arithmetic, finite-fields, C, SageMath]
topics: prime fields, curve equations, nonsingularity, affine points, field representation
short: "Prime-field curve equations, nonsingularity, point representation, and C-level field invariants."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-01" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 01</p>

# Fields and curve equations

<p class="ec-deck">Before adding points, the library must decide what a field element is, what a valid curve is, and which residues a C function may accept or return.</p>
</header>

The book begins elliptic-curve arithmetic after finite-field arithmetic because every point formula is only shorthand for field additions, subtractions, multiplications, squarings, and inversions. Here we work over a prime field $$\mathbb F_p$$ with $$p>3$$.

## Prime-field elements

Mathematically,

$$
\mathbb F_p=\mathbb Z/p\mathbb Z.
$$

In C, a field element is not an integer modulo $$p$$ in the abstract. It is a fixed-size representation with a stated range. A canonical residue satisfies $$0\le x<p$$. A lazy residue may satisfy $$0\le x<cp$$ for a small constant $$c$$. The field API must say which one it accepts.

```c
typedef struct {
    uint16_t limb[16]; /* little-endian 16-bit limbs, value < p unless documented otherwise */
} fe_t;
```

This connects directly to [bignum limb representation](/articles/bn-01-limbs-radix-and-word-size/) and [prime-field arithmetic](/articles/bn-10-prime-field-arithmetic/).

## Short Weierstrass curves

For $$p>3$$, the implementation target is

$$
E/\mathbb F_p:\qquad y^2=x^3+ax+b.
$$

The curve is nonsingular exactly when

$$
\Delta=-16(4a^3+27b^2)\ne 0.
$$

Since $$-16$$ is nonzero in $$\mathbb F_p$$, a C parameter loader can check $$4a^3+27b^2\not\equiv 0\pmod p$$.

<div class="ec-example" markdown="1">
<span class="ec-env-title">Example: a valid small curve</span>

Over $$\mathbb F_{17}$$, $$a=2,b=2$$ gives $$4a^3+27b^2=140\equiv 4$$, so the curve is nonsingular. The point $$(5,1)$$ lies on it because $$1^2\equiv 5^3+2\cdot 5+2\equiv 1\pmod {17}$$.
</div>

<div class="ec-example" markdown="1">
<span class="ec-env-title">Example: a singular equation</span>

Over any odd field, $$y^2=x^3$$ has $$a=b=0$$ and discriminant zero. It has a cusp at the origin. Implementing the chord-and-tangent formulas on this equation does not give an elliptic-curve group.
</div>

## Point representation

An affine point is either $$\mathcal O$$, the point at infinity, or a pair $$(x,y)\in\mathbb F_p^2$$ satisfying the equation. In C:

```c
typedef struct {
    fe_t x;
    fe_t y;
    uint32_t infinity; /* public flag for decoded/public points */
} ec_affine_t;
```

For secret-dependent intermediate values, prefer a representation that can be selected with masks. A public decoded key may branch on `infinity`; a scalar-multiplication loop may not branch on a secret point state unless the state is public by construction.

## SageMath parameter checks

```python
p = 17
F = GF(p)
for a, b in [(2, 2), (0, 0)]:
    disc = F(4*a^3 + 27*b^2)
    print(a, b, disc != 0)
    if disc != 0:
        E = EllipticCurve(F, [a, b])
        print(E.cardinality(), E(5, 1) in E if (F(1)^2 == F(5)^3 + a*F(5) + b) else "skip")
```

## C proof obligations

1. `fe_is_canonical(x)` must be correct for the chosen limb order.
2. `fe_add`, `fe_sub`, `fe_mul`, and `fe_sqr` must document output ranges.
3. Curve validation must reject noncanonical encodings unless the protocol explicitly permits reduction.
4. All parameter constants must be generated from exact integers, not decimal transcription by hand.

<nav class="ec-nav">
  <a href="/articles/ec-00-roadmap/"><span>Previous</span>Elliptic Arithmetic 00: Roadmap for a C Curve Library</a>
  <a class="ec-next" href="/articles/ec-02-affine-group-law/"><span>Next</span>Elliptic Arithmetic 02: Affine Group Law</a>
</nav>

</article>

