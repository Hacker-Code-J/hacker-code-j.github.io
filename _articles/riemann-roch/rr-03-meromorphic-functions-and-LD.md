---
title: "Riemann-Roch 03: The Space L(D)"
layout: page
categories: Mathematics
tags: [riemann-roch, meromorphic-functions, linear-systems]
topics: L(D), meromorphic functions, poles, linear systems
short: "The finite-dimensional space attached to a divisor."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-03" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / III</p>

# The space L(D)

<p class="rr-deck">A divisor bound cuts out a concrete vector space of meromorphic functions. This space is the object whose dimension Riemann-Roch predicts.</p>
</header>

For a divisor $$D$$, define

$$
L(D)=\{f\in\mathbb C(X)^*: (f)+D\ge 0\}\cup\{0\}.
$$

This is the space that Riemann-Roch counts. Its dimension is denoted $$\ell(D)$$.

The definition is local at every point, but the answer is global. At a point where $$D$$ has coefficient $$n$$, the inequality says

$$
\operatorname{ord}_P(f)+n\ge 0.
$$

If $$n>0$$, poles are allowed up to order $$n$$. If $$n<0$$, zeros are forced.

## Why this is a vector space

The pole order of a sum cannot be worse than the larger of the pole orders of its summands. Hence if two functions satisfy the same divisor bound, so does any linear combination of them. This proves that $$L(D)$$ is a complex vector space.

Compactness then implies finite dimension. The divisor bounds all possible principal parts at the finite set of points in its support; away from that set the functions are holomorphic.

<div class="rr-env" markdown="1">
<span class="rr-env-title">Immediate vanishing</span>

If $$\deg(D)<0$$, then $$L(D)=0$$.
</div>

Indeed, if $$0\ne f\in L(D)$$, then $$(f)+D$$ is effective. Its degree is $$\deg(D)$$, since principal divisors have degree zero. An effective divisor cannot have negative degree.

## Linear systems

The projectivization

$$
|D|=\mathbb P(L(D))
$$

is the complete linear system of $$D$$, when $$L(D)\ne 0$$. It is the family of effective divisors linearly equivalent to $$D$$.

<div class="rr-example" markdown="1">
<span class="rr-env-title">The polynomial model</span>

On $$\mathbb P^1$$,

$$
L(2\infty)=\operatorname{span}\{1,z,z^2\}.
$$

The divisor bound permits a double pole at infinity and no finite poles. That is exactly the condition of being a polynomial of degree at most two.
</div>

<div class="rr-example" markdown="1">
<span class="rr-env-title">Two spaces with actual pole bookkeeping</span>

On $$\mathbb P^1$$, let

$$
D=2\infty+0.
$$

A function in $$L(D)$$ may have a double pole at infinity and a simple pole at zero, and no other poles. Hence it is a Laurent polynomial with exponents between $$-1$$ and $$2$$:

$$
L(2\infty+0)=\operatorname{span}\{z^{-1},1,z,z^2\}.
$$

The dimension is $$4$$, matching $$\deg(D)+1$$.

On $$E:y^2=x^3-x$$, the coordinate functions have pole orders $$2$$ and $$3$$ at $$O$$. Therefore

$$
L(2O)=\operatorname{span}\{1,x\},
\qquad
L(3O)=\operatorname{span}\{1,x,y\}.
$$

These are not formal bases chosen for convenience: their pole orders are exactly what the divisor permits.
</div>

Riemann-Roch is valuable because direct computation of $$L(D)$$ becomes hard once the curve has positive genus. The theorem replaces that computation with degree, genus, and a dual space.

<nav class="rr-nav">
  <a href="/articles/rr-02-divisors-and-degree/"><span>Previous</span>Riemann-Roch 02: Divisors and Degree</a>
  <a class="rr-next" href="/articles/rr-04-canonical-divisor/"><span>Next</span>Riemann-Roch 04: Canonical Divisors</a>
</nav>

</article>
