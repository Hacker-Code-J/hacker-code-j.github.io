---
title: "Riemann-Roch 04: Canonical Divisors"
layout: page
categories: Mathematics
tags: [riemann-roch, canonical-divisor, differentials]
topics: canonical divisor, differentials, genus, K
short: "How differentials create the correction term."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-04" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / IV</p>

# Canonical divisors and differentials

<p class="rr-deck">The correction term in Riemann-Roch comes from differentials. Canonical divisors are the divisor language for those differentials.</p>
</header>

A meromorphic differential is locally written as

$$
\omega=f(z)\,dz.
$$

Just as a meromorphic function has a divisor of zeros and poles, a nonzero meromorphic differential has a divisor

$$
(\omega)=\sum_P \operatorname{ord}_P(\omega)P.
$$

Any divisor of this form is called canonical. It is denoted by $$K$$.

## Independence of the choice

If $$\omega_1$$ and $$\omega_2$$ are two nonzero meromorphic differentials, then $$\omega_1/\omega_2$$ is a meromorphic function. Therefore

$$
(\omega_1)-(\omega_2)=(\omega_1/\omega_2).
$$

So different choices of differential give linearly equivalent canonical divisors. The canonical class is well defined.

<div class="rr-env" markdown="1">
<span class="rr-env-title">Canonical degree</span>

For a compact Riemann surface of genus $$g$$,

$$
\deg(K)=2g-2.
$$
</div>

On $$\mathbb P^1$$, the differential $$dz$$ has a double pole at infinity, so $$K\sim -2\infty$$. On an elliptic curve, the invariant differential has no zeros and no poles, so $$K\sim 0$$.

## Why differentials enter Riemann-Roch

The theorem contains $$\ell(K-D)$$, not merely $$\ell(D)$$. This is the dual term. Classically it is a space of meromorphic differentials constrained by $$D$$. Cohomologically it is Serre dual to $$H^1(X,\mathcal O(D))$$.

A first consequence comes from setting $$D=0$$:

$$
\ell(0)-\ell(K)=1-g.
$$

Since the only holomorphic functions on a compact Riemann surface are constants, $$\ell(0)=1$$. Hence

$$
\ell(K)=g.
$$

<div class="rr-example" markdown="1">
<span class="rr-env-title">Interpretation</span>

The dimension of the space of holomorphic one-forms is the genus. This is one of the cleanest places where topology appears as a vector-space dimension.
</div>

<nav class="rr-nav">
  <a href="/articles/rr-03-meromorphic-functions-and-LD/"><span>Previous</span>Riemann-Roch 03: The Space L(D)</a>
  <a class="rr-next" href="/articles/rr-05-the-theorem/"><span>Next</span>Riemann-Roch 05: The Theorem</a>
</nav>

</article>
