---
title: "Coding Theory 12: Surface Geometry for Codes"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: ample divisors, cohomology, genus, intersection, surface Riemann-Roch
short: "The surface geometry developed in Chapter 5.1-5.3."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-12" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 12</p>

# Surface geometry for codes

<p class="ct-deck">On surfaces, divisor degree is replaced by intersection theory and sheaf cohomology.</p>
</header>

A surface is a nonsingular projective variety of dimension $$2$$. A divisor $$D$$ on a surface has intersection numbers $$D\cdot C$$ with curves $$C$$. This pairing replaces the one-dimensional degree theory used on curves.

An invertible sheaf is very ample if it embeds the surface into projective space. It is ample if some positive tensor power is very ample. A divisor is ample or very ample when its associated invertible sheaf has that property.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: $$\mathcal O_{\mathbb P^2}(1)$$ is very ample</span>

The global sections of $$\mathcal O(1)$$ give the identity embedding of $$\mathbb P^2$$. The divisor class is a line $$H$$ with $$H^2=1$$.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: product surface ampleness</span>

On $$\mathbb P^1\times\mathbb P^1$$, a divisor $$aF_1+bF_2$$ is ample when $$a>0$$ and $$b>0$$. It must be positive on both ruling directions.
</div>

## Cohomology and genus

For a coherent sheaf $$\mathcal F$$, the groups $$H^i(X,\mathcal F)$$ are finite-dimensional over the ground field when $$X$$ is projective. For a surface,

$$
\chi(\mathcal O_X)=h^0(\mathcal O_X)-h^1(\mathcal O_X)+h^2(\mathcal O_X).
$$

The arithmetic genus is $$p_a=\chi(\mathcal O_X)-1$$ in the surface-code convention used here, and the geometric genus is $$p_g=h^0(X,\omega_X)=h^2(X,\mathcal O_X)$$ by Serre duality.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: projective plane genus invariants</span>

For $$\mathbb P^2$$, $$h^1(\mathcal O)=h^2(\mathcal O)=0$$. Thus $$p_a=0$$ and $$p_g=0$$. This makes surface Riemann-Roch particularly clean.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: irregular surfaces</span>

A ruled surface over a genus $$g$$ curve has $$h^1(\mathcal O_X)=g$$. The base curve leaves a cohomological trace on the surface. This is why ruled surface dimensions reduce to vector-bundle cohomology on the base.
</div>

## Intersection, adjunction, and Riemann-Roch

For a smooth curve $$C\subset X$$ and canonical divisor $$K$$,

$$
2g(C)-2=C\cdot(C+K).
$$

For any divisor $$D$$ on a surface, Riemann-Roch says

$$
h^0(D)-h^1(D)+h^0(K-D)=\frac12D\cdot(D-K)+1+p_a.
$$

The middle term $$h^1(D)$$ is the new obstruction. On curves, large degree removes the correction. On surfaces, the correction is harder to control.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 5: Riemann-Roch on $$\mathbb P^2$$</span>

Let $$D=mH$$ and $$K=-3H$$. Then

$$
{1\over2}D(D-K)+1={1\over2}m(m+3)+1={m+2\choose2},
$$

matching the number of degree $$m$$ homogeneous monomials.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 6: adjunction for plane curves</span>

A smooth plane curve of degree $$d$$ has class $$dH$$. Since $$K=-3H$$,

$$
2g-2=dH\cdot(dH-3H)=d(d-3),
$$

so $$g=(d-1)(d-2)/2$$.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-11-divisors-picard-and-variety-codes/"><span>Previous</span>Divisors and Variety Codes</a>
  <a class="ct-next" href="/articles/ct-13-parameters-of-codes-on-surfaces/"><span>Next</span>Surface Code Parameters</a>
</nav>

</article>
