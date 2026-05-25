---
title: "Elliptic Arithmetic 03: Projective and Jacobian Coordinates"
layout: page
categories: Computing
tags: [elliptic-arithmetic, Jacobian, C]
topics: projective coordinates, Jacobian coordinates, inversions, point representation
short: "Projective and Jacobian coordinates as the implementation bridge from affine geometry to C."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-03" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 03</p>

# Projective and Jacobian coordinates

<p class="ec-deck">Projective coordinates exchange one inversion for many multiplications. In prime-field ECC that is usually the correct trade.</p>
</header>

The reference text treats coordinate choice as an implementation decision: affine formulas are simple, but projective formulas dominate when inversion is much more expensive than multiplication.

## Homogeneous coordinates

A projective point is an equivalence class of triples. In standard projective coordinates,

$$
(X:Y:Z)\sim(\lambda X:\lambda Y:\lambda Z).
$$

When $$Z$$ is nonzero, it corresponds to $$(X/Z,Y/Z)$$. Triples with $$Z=0$$ lie on the projective line at infinity; on the projective closure of a short-Weierstrass curve, the curve has a single such point.

## Jacobian coordinates

For short Weierstrass curves, Jacobian coordinates use

$$
(X:Y:Z)\longmapsto (X/Z^2,\;Y/Z^3).
$$

Jacobian equivalence is weighted: $$(X:Y:Z)\sim(\lambda^2X:\lambda^3Y:\lambda Z)$$ for nonzero $$\lambda$$. Thus the same affine point has many Jacobian representatives, but the scaling rule is not the uniform projective rule from the previous subsection.

The curve equation becomes

$$
Y^2=X^3+aXZ^4+bZ^6.
$$

The affine point $$(x,y)$$ is represented by $$(x:y:1)$$. The identity can be represented by any agreed exceptional encoding with $$Z=0$$; use one canonical internal encoding, for example $$(1:1:0)$$.

```c
typedef struct {
    fe_t X, Y, Z;
} ec_jac_t;

static int ec_jac_is_infinity(const ec_jac_t *p) {
    return fe_is_zero(&p->Z);
}
```

## Conversion costs

To convert $$(X:Y:Z)$$ with $$Z\ne 0$$ to affine, compute

$$
z^{-1},\qquad x=Xz^{-2},\qquad y=Yz^{-3}.
$$

That is one inversion, one squaring, and two or three multiplications depending on scheduling. The scalar-multiplication loop should pay this at the end, not after every addition.

<div class="ec-example" markdown="1">
<span class="ec-env-title">Example: same affine point, many representatives</span>

Over $$\mathbb F_{17}$$, $$(5,1)$$ is represented by $$(5,1,1)$$. With $$\lambda=3$$, the equivalent Jacobian representative is $$(\lambda^2 5,\lambda^3 1,\lambda)=(11,10,3)$$ because $$11/3^2\equiv 5$$ and $$10/3^3\equiv 1$$.
</div>

<div class="ec-example" markdown="1">
<span class="ec-env-title">Example: why inversion avoidance matters</span>

If an inversion costs roughly 80 multiplications on a target, replacing each affine addition by a formula using about 8-12 multiplications is decisive. If inversion is implemented by exponentiation $$z^{p-2}$$, the gap is even larger.
</div>

## Representation invariant

A Jacobian point is valid if either $$Z=0$$ and the point is the internal infinity encoding, or $$Z\ne 0$$ and the affine pair obtained by division satisfies the curve equation. The C type cannot enforce this. Every function must state whether it preserves the invariant under lazy field ranges.

## SageMath representative check

```python
p = 17
F = GF(p)
x, y, z = F(11), F(10), F(3)
print(x / z^2, y / z^3)
print((x / z^2, y / z^3) == (F(5), F(1)))
```

<nav class="ec-nav">
  <a href="/articles/ec-02-affine-group-law/"><span>Previous</span>Elliptic Arithmetic 02: Affine Group Law</a>
  <a class="ec-next" href="/articles/ec-04-jacobian-addition-and-doubling/"><span>Next</span>Elliptic Arithmetic 04: Jacobian Addition and Doubling</a>
</nav>

</article>

