---
title: "Riemann-Roch 11: Computation Checklist"
layout: page
categories: Mathematics
tags: [riemann-roch, computation, checklist]
topics: computation, examples, SageMath workflow
short: "A sign-safe way to use the theorem in calculations."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-11" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / XI</p>

# A working checklist

<p class="rr-deck">A practical use of the theorem is mostly a discipline of signs: compute the degree, inspect the correction, then substitute.</p>
</header>

A Riemann-Roch computation should keep the signs visible. Most mistakes come from confusing $$K-D$$ with $$D-K$$, or from forgetting that positive coefficients in $$D$$ allow poles in $$L(D)$$.

## A reliable order

Given a divisor $$D$$ on a compact Riemann surface $$X$$:

1. Write down the genus $$g$$.
2. Compute $$\deg(D)$$.
3. Use $$\deg(K)=2g-2$$.
4. Compute $$\deg(K-D)=2g-2-\deg(D)$$.
5. Decide whether $$\ell(K-D)$$ vanishes.
6. Apply

$$
\ell(D)=\deg(D)+1-g+\ell(K-D).
$$

<div class="rr-warning" markdown="1">
<span class="rr-env-title">Fast vanishing test</span>

If $$\deg(K-D)<0$$, then $$\ell(K-D)=0$$. Equivalently, if $$\deg(D)>2g-2$$, then

$$
\ell(D)=\deg(D)+1-g.
$$
</div>

## Two reference computations

On $$\mathbb P^1$$, with $$D=n\infty$$ and $$n\ge 0$$,

$$
g=0,
\qquad K\sim -2\infty,
\qquad \ell(D)=n+1.
$$

On an elliptic curve, with $$D$$ effective of degree $$d>0$$,

$$
g=1,
\qquad K\sim 0,
\qquad \ell(D)=d.
$$

These two cases are worth checking before any more complicated example.

A third check is useful because it is the first one not covered by genus zero or one. Let

$$
C:y^2=x^5-x+1
$$

be a genus two hyperelliptic curve with point $$O$$ at infinity. For $$D=3O$$,

$$
\deg(D)=3,
\qquad
2g-2=2,
$$

so the correction term vanishes. Therefore

$$
\ell(3O)=3+1-2=2.
$$

The explicit basis is $$\{1,x\}$$, since $$x$$ has pole order $$2$$ at $$O$$ while $$y$$ has pole order $$5$$.

## What to record in a computation

For a SageMath notebook, generated figure, or hand calculation, record the following fields explicitly:

| Field | What should be written |
|---|---|
| curve | equation, projective model, or lattice model |
| genus | the integer $$g$$ |
| divisor | points and multiplicities |
| degree | $$\deg(D)$$ |
| canonical data | $$K$$ or at least $$\deg(K)$$ |
| correction | $$\ell(K-D)$$ |
| check | both sides of Riemann-Roch |

The final line should be an equality, not a paragraph:

$$
\ell(D)-\ell(K-D)=\deg(D)+1-g.
$$

If the equality fails, the bug is almost always a sign, a degree, or a mistaken canonical divisor.

<nav class="rr-nav">
  <a href="/articles/rr-10-residues-and-codes/"><span>Previous</span>Riemann-Roch 10: Residues and Codes</a>
  <a class="rr-next" href="/articles/rr-12-application-algebraic-curve/"><span>Next</span>Riemann-Roch 12: Application I - Compact Riemann Surfaces Are Algebraic</a>
</nav>

</article>
