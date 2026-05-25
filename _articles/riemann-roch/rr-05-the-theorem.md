---
title: "Riemann-Roch 05: The Theorem"
layout: page
categories: Mathematics
tags: [riemann-roch, theorem, dimension]
topics: theorem statement, correction term, expected dimension
short: "A careful reading of the Riemann-Roch formula."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-05" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / V</p>

# The theorem, read carefully

<p class="rr-deck">The formula is short, but it is safer to read it as a comparison between an expected count and a dual correction term.</p>
</header>

Let $$X$$ be a compact Riemann surface of genus $$g$$, let $$D$$ be a divisor, and let $$K$$ be a canonical divisor. Riemann-Roch says

<div class="rr-env" markdown="1">
<span class="rr-env-title">Riemann-Roch</span>

$$
\ell(D)-\ell(K-D)=\deg(D)+1-g.
$$
</div>

It is often more useful to solve for $$\ell(D)$$:

$$
\ell(D)=\deg(D)+1-g+\ell(K-D).
$$

The term $$\deg(D)+1-g$$ is the expected dimension. The term $$\ell(K-D)$$ is the special contribution.

## The nonspecial range

Since $$\deg(K)=2g-2$$,

$$
\deg(K-D)=2g-2-\deg(D).
$$

If $$\deg(D)>2g-2$$, then $$\deg(K-D)<0$$, and hence $$\ell(K-D)=0$$. In that case

$$
\ell(D)=\deg(D)+1-g.
$$

Divisors for which the correction term vanishes are called nonspecial.

## A basic existence use

Constants always lie in $$L(D)$$ when $$D$$ is effective. A nonconstant meromorphic function appears once $$\ell(D)\ge 2$$. In the nonspecial range this becomes a numerical condition:

$$
\deg(D)+1-g\ge 2.
$$

Thus sufficiently many allowed poles force the existence of a nonconstant meromorphic function.

## Two substitutions that test the formula

On $$\mathbb P^1$$, take $$D=2\infty+0$$. We already computed

$$
L(D)=\operatorname{span}\{z^{-1},1,z,z^2\},
$$

so $$\ell(D)=4$$. Riemann-Roch gives the same value because $$g=0$$, $$\deg(D)=3$$, and $$\ell(K-D)=0$$:

$$
\ell(D)=3+1=4.
$$

For a less spherical test, take the genus two hyperelliptic curve

$$
C:y^2=x^5-x+1
$$

with its unique point $$O$$ at infinity, and put $$D=3O$$. Here $$g=2$$ and $$\deg(D)=3>2g-2=2$$, so the correction term vanishes. Riemann-Roch gives

$$
\ell(3O)=3+1-2=2.
$$

This agrees with the explicit pole orders: $$x$$ has pole order $$2$$ at $$O$$, while $$y$$ has pole order $$5$$. Thus

$$
L(3O)=\operatorname{span}\{1,x\}.
$$

The example shows why the theorem is more than degree counting: it predicts the absence of a third function even though the divisor has degree three.

## Where a proof comes from

The modern proof is best remembered through the line bundle $$\mathcal O(D)$$. One proves

$$
\chi(\mathcal O(D))=\deg(D)+1-g,
$$

where

$$
\chi=h^0-h^1.
$$

Serre duality identifies

$$
H^1(X,\mathcal O(D))^*\cong H^0(X,\mathcal O(K-D)).
$$

Substituting $$h^0=\ell(D)$$ and $$h^1=\ell(K-D)$$ gives the classical formula.

<div class="rr-aside" markdown="1">
<span class="rr-env-title">Practical reading</span>

Most computations are not proofs of Riemann-Roch. They are uses of it: compute the degree, decide whether $$K-D$$ has sections, and then read off $$\ell(D)$$.
</div>

<nav class="rr-nav">
  <a href="/articles/rr-04-canonical-divisor/"><span>Previous</span>Riemann-Roch 04: Canonical Divisors</a>
  <a class="rr-next" href="/articles/rr-06-genus-zero/"><span>Next</span>Riemann-Roch 06: Genus Zero</a>
</nav>

</article>
