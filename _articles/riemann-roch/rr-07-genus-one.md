---
title: "Riemann-Roch 07: Genus One"
layout: page
categories: Mathematics
tags: [riemann-roch, genus-one, elliptic-curves]
topics: elliptic curves, complex tori, canonical divisor
short: "The Riemann-Roch count on a complex torus."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-07" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / VII</p>

# The elliptic curve case

<p class="rr-deck">On an elliptic curve, the canonical divisor is trivial and the dimension count shifts by one from the genus zero case.</p>
</header>

Let $$X$$ be a genus one compact Riemann surface. Analytically,

$$
X\cong \mathbb C/\Lambda.
$$

After choosing a base point, it is an elliptic curve. The invariant differential $$dz$$ descends to the torus and has no zeros or poles, so

$$
K\sim 0.
$$

Riemann-Roch becomes

$$
\ell(D)-\ell(-D)=\deg(D).
$$

## Positive effective divisors

If $$D$$ is effective and $$\deg(D)>0$$, then $$-D$$ has negative degree. Hence $$\ell(-D)=0$$, and therefore

$$
\ell(D)=\deg(D).
$$

This is the basic genus one count.

<div class="rr-example" markdown="1">
<span class="rr-env-title">A single pole is not enough</span>

For one point $$P$$,

$$
\ell(P)=1.
$$

Thus a meromorphic function on an elliptic curve cannot have only one simple pole unless it is constant.
</div>

For two points,

$$
\ell(P+Q)=2,
$$

so a nonconstant function exists with poles bounded by $$P+Q$$.

On the concrete elliptic curve $$E:y^2=x^3-x$$, this appears in the familiar functions

$$
L(2O)=\operatorname{span}\{1,x\},
\qquad
L(3O)=\operatorname{span}\{1,x,y\}.
$$

The first space has dimension $$2$$ because $$x$$ has a double pole at $$O$$. The second has dimension $$3$$ because $$y$$ has a triple pole at $$O$$. These two computations are the genus one analogue of polynomial bases on $$\mathbb P^1$$.

## Geometric reason

A nonconstant meromorphic function with one simple pole would define a degree one map $$X\to\mathbb P^1$$. A degree one map between smooth compact curves is an isomorphism. That would force a genus one curve to be the projective line, which is impossible.

The equality $$\ell(P)=1$$ is the dimension-count version of that geometric obstruction.

## The shift from genus zero

On $$\mathbb P^1$$, a divisor of degree $$n$$ gives dimension $$n+1$$. On an elliptic curve, a positive effective divisor of degree $$n$$ gives dimension $$n$$. The missing one dimension is exactly the genus term in Riemann-Roch.

<nav class="rr-nav">
  <a href="/articles/rr-06-genus-zero/"><span>Previous</span>Riemann-Roch 06: Genus Zero</a>
  <a class="rr-next" href="/articles/rr-08-linear-equivalence/"><span>Next</span>Riemann-Roch 08: Linear Equivalence</a>
</nav>

</article>
