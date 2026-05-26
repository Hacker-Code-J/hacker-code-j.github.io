---
title: "Elliptic Arithmetic 02: Affine Group Law"
layout: page
categories: Computing
tags: [elliptic-arithmetic, group-law, C]
topics: affine addition, doubling, inverses, exceptional cases, proof sketch
short: "The affine chord-and-tangent group law and why it is mainly a specification for C."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-02" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 02</p>

# Affine group law

<p class="ec-deck">Affine formulas are the clean mathematical specification. A cryptographic C implementation usually avoids them inside scalar multiplication because each addition needs an inversion.</p>
</header>

For $$E:y^2=x^3+ax+b$$ over $$\mathbb F_p$$, the inverse of $$P=(x,y)$$ is $$-P=(x,-y)$$, and $$\mathcal O$$ is the identity.

## Addition and doubling formulas

If $$P=(x_1,y_1)$$ and $$Q=(x_2,y_2)$$ with $$P\ne \pm Q$$, define

$$
\lambda=\frac{y_2-y_1}{x_2-x_1},\qquad
x_3=\lambda^2-x_1-x_2,\qquad
y_3=\lambda(x_1-x_3)-y_1.
$$

Then $$P+Q=(x_3,y_3)$$.

If $$P=Q$$ and $$y_1\ne 0$$, define

$$
\lambda=\frac{3x_1^2+a}{2y_1}.
$$

The same formulas for $$x_3,y_3$$ give $$2P$$. If $$y_1=0$$, then $$2P=\mathcal O$$.

<div class="ec-proof" markdown="1">
<span class="ec-env-title">Proof sketch</span>

The line $$y=\lambda x+\nu$$ through two points intersects the cubic in three roots. Substituting into $$y^2=x^3+ax+b$$ gives a monic cubic in $$x$$ whose roots are $$x_1,x_2,x_3'$$. The coefficient of $$x^2$$ is $$-\lambda^2$$, so $$x_1+x_2+x_3'=\lambda^2$$. Thus $$x_3'=\lambda^2-x_1-x_2$$. The group law takes the reflection across the $$x$$-axis, giving $$y_3=\lambda(x_1-x_3')-y_1$$.
</div>

## Two exact examples

On $$E:y^2=x^3+2x+2$$ over $$\mathbb F_{17}$$, let $$P=(5,1)$$ and $$Q=(6,3)$$. Then

$$
\lambda=\frac{3-1}{6-5}=2,\quad x_3=4-5-6\equiv 10,\quad y_3=2(5-10)-1\equiv 6.
$$

So $$P+Q=(10,6)$$.

For doubling $$P=(5,1)$$,

$$
\lambda=\frac{3\cdot 5^2+2}{2}=\frac{77}{2}\equiv 9\cdot 9\equiv 13,
$$

and $$2P=(6,3)$$.

## C shape: specification, not inner loop

```c
int p256_affine_add_spec(p256_affine_t *r, const p256_affine_t *p, const p256_affine_t *q) {
    if (p->infinity) { *r = *q; return 1; }
    if (q->infinity) { *r = *p; return 1; }
    /* Public/specification path: compare x, handle inverse/doubling, invert denominator. */
    return 1;
}
```

This is useful for tests and public validation paths. It is unsuitable as the main scalar-multiplication primitive because `fe256_inv` is expensive, often variable-time unless carefully implemented, and exceptional-case branching is hard to make secret-independent.

## SageMath formula check

```python
p = 17
F = GF(p)
E = EllipticCurve(F, [2, 2])
P = E(5, 1)
Q = E(6, 3)
print(P + Q)
print(2*P == Q)
print(P + (-P) == E(0))
```

<nav class="ec-nav">
  <a href="/articles/ec-01-fields-and-curve-equations/"><span>Previous</span>Elliptic Arithmetic 01: Fields and Curve Equations</a>
  <a class="ec-next" href="/articles/ec-03-projective-and-jacobian-coordinates/"><span>Next</span>Elliptic Arithmetic 03: Projective and Jacobian Coordinates</a>
</nav>

</article>

