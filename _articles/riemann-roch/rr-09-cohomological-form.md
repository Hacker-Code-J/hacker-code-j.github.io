---
title: "Riemann-Roch 09: Cohomological Form"
layout: page
categories: Mathematics
tags: [riemann-roch, sheaf-cohomology, line-bundles]
topics: line bundles, Euler characteristic, H0, H1
short: "The theorem as an Euler characteristic statement."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-09" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / IX</p>

# The cohomological form

<p class="rr-deck">In modern language, Riemann-Roch is the Euler characteristic formula for the line bundle attached to a divisor.</p>
</header>

The divisor $$D$$ determines a line bundle $$\mathcal O(D)$$. Its global sections are exactly the classical space:

$$
H^0(X,\mathcal O(D))=L(D).
$$

Thus $$h^0(X,\mathcal O(D))=\ell(D)$$.

The cohomological form of Riemann-Roch is

<div class="rr-env" markdown="1">
<span class="rr-env-title">Curve Riemann-Roch</span>

$$
h^0(X,\mathcal O(D))-h^1(X,\mathcal O(D))=\deg(D)+1-g.
$$
</div>

The left side is the Euler characteristic $$\chi(\mathcal O(D))$$.

## Recovering the classical formula

Serre duality gives

$$
H^1(X,\mathcal O(D))^*\cong H^0(X,\mathcal O(K-D)).
$$

Therefore

$$
h^1(X,\mathcal O(D))=\ell(K-D).
$$

Substitution gives

$$
\ell(D)-\ell(K-D)=\deg(D)+1-g.
$$

This is exactly the classical theorem.

## Why this version is useful

The cohomological statement explains the correction term. It is not a mysterious extra space added to fix the formula. It is the first cohomology group of the line bundle, written in dual classical language.

| Classical term | Cohomological term |
|---|---|
| $$L(D)$$ | $$H^0(X,\mathcal O(D))$$ |
| $$\ell(K-D)$$ | $$h^1(X,\mathcal O(D))$$ by duality |
| dimension formula | Euler characteristic formula |

Two quick checks make the dictionary less abstract.

On $$\mathbb P^1$$, the line bundle $$\mathcal O(n)$$ satisfies

$$
h^0(\mathbb P^1,\mathcal O(n))=n+1,
\qquad
h^1(\mathbb P^1,\mathcal O(n))=0
$$

for $$n\ge 0$$. For $$n=-3$$, the global sections vanish, but

$$
h^1(\mathbb P^1,\mathcal O(-3))=2,
$$

which is dual to $$H^0(\mathbb P^1,\mathcal O(1))$$.

On an elliptic curve, a line bundle of positive degree $$d$$ has

$$
h^0=d,
\qquad
h^1=0.
$$

For the trivial bundle, however, $$h^0=1$$ and $$h^1=1$$. The Euler characteristic is zero, exactly as $$\deg+1-g=0$$ predicts for degree zero and genus one.

For computations on curves, the classical notation is often quicker. For proofs, generalizations, and higher-dimensional analogues, the cohomological form is the durable one.

<nav class="rr-nav">
  <a href="/articles/rr-08-linear-equivalence/"><span>Previous</span>Riemann-Roch 08: Linear Equivalence</a>
  <a class="rr-next" href="/articles/rr-10-residues-and-codes/"><span>Next</span>Riemann-Roch 10: Residues and Codes</a>
</nav>

</article>
