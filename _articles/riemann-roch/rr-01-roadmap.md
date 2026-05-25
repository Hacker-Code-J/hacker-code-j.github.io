---
title: "Riemann-Roch 01: Roadmap"
layout: page
categories: Mathematics
tags: [riemann-roch, roadmap, algebraic-geometry]
topics: roadmap, divisors, meromorphic functions, genus
short: "A less compressed first reading of what Riemann-Roch counts."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-01" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / I</p>

# A first reading of Riemann-Roch

<p class="rr-deck">The theorem is best approached as a counting theorem for meromorphic functions with prescribed poles, not as a formula to memorize.</p>
</header>

Riemann-Roch is often quoted before its terms have had time to become familiar. That is a bad way to meet the theorem. The useful version is not a slogan about curves, but a rule for a particular counting problem: given a compact Riemann surface $$X$$ and a prescription of allowed poles, determine the dimension of the resulting space of meromorphic functions.

The prescription is a divisor

$$
D=\sum_P n_P P.
$$

The vector space being counted is

$$
L(D)=\{f\in \mathbb C(X): (f)+D\ge 0\}.
$$

Here $$(f)$$ is the divisor of zeros and poles of $$f$$. The inequality says that the poles of $$f$$ are no worse than the positive coefficients of $$D$$, and that negative coefficients of $$D$$ impose zeros.

<div class="rr-env" markdown="1">
<span class="rr-env-title">The theorem in one line</span>

For a canonical divisor $$K$$ and genus $$g$$,

$$
\ell(D)-\ell(K-D)=\deg(D)+1-g.
$$
</div>

The formula is short, but each term has a different origin. The degree is arithmetic. The genus is topology. The term $$\ell(K-D)$$ is the part that comes from differentials and duality.

## The order of ideas

The notes are arranged so that the formula is not doing all the work at once.

| Step | Question |
|---|---|
| Divisors | How are zeros and poles recorded? |
| $$L(D)$$ | Which functions obey a divisor bound? |
| Canonical divisors | Where does the differential term come from? |
| The theorem | How do degree, genus, and the correction fit together? |
| Examples | What changes between $$\mathbb P^1$$ and an elliptic curve? |
| Cohomology and codes | Why does the same theorem reappear in modern language? |
| Applications | Why compact Riemann surfaces are algebraic, and why Goppa codes use the same divisor logic. |

A good mental model is the case $$X=\mathbb P^1$$ and $$D=n\infty$$. Then $$L(D)$$ is spanned by

$$
1,z,z^2,\ldots,z^n,
$$

so $$\ell(D)=n+1$$. Riemann-Roch is the theorem saying what survives of this elementary count on an arbitrary compact Riemann surface.

<div class="rr-aside" markdown="1">
<span class="rr-env-title">A warning about intuition</span>

The degree of $$D$$ is only the first approximation. On curves of positive genus, divisors of the same degree may behave differently. The correction term is not decoration; it is exactly where that extra geometry enters.
</div>

<nav class="rr-nav">
  
  <a class="rr-next" href="/articles/rr-02-divisors-and-degree/"><span>Next</span>Riemann-Roch 02: Divisors and Degree</a>
</nav>

</article>
