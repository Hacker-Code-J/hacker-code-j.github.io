---
title: "Riemann-Roch 06: Genus Zero"
layout: page
categories: Mathematics
tags: [riemann-roch, genus-zero, projective-line]
topics: CP1, rational functions, pole at infinity
short: "The projective line as the base case for the theorem."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-06" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / VI</p>

# The sphere as a calibration

<p class="rr-deck">On the sphere, Riemann-Roch says exactly what polynomial degree counting already says. That is why it is the right test case.</p>
</header>

The projective line is the calibration example. Let

$$
X=\mathbb P^1.
$$

Then $$g=0$$ and $$K\sim -2\infty$$. Riemann-Roch becomes

$$
\ell(D)-\ell(K-D)=\deg(D)+1.
$$

## One pole at infinity

Take $$D=n\infty$$ with $$n\ge 0$$. The functions in $$L(D)$$ are meromorphic on $$\mathbb P^1$$, have no finite poles, and have pole order at most $$n$$ at infinity. They are precisely the polynomials of degree at most $$n$$:

$$
L(n\infty)=\operatorname{span}\{1,z,z^2,\ldots,z^n\}.
$$

So

$$
\ell(n\infty)=n+1.
$$

This is the theorem in its most familiar form.

## Why every effective divisor behaves the same

On $$\mathbb P^1$$, divisors are classified up to linear equivalence by degree. Therefore any effective divisor of degree $$n$$ is linearly equivalent to $$n\infty$$. Since linearly equivalent divisors have isomorphic $$L(D)$$ spaces,

$$
\deg(D)=n,
\qquad D\ge 0
\quad\Rightarrow\quad
\ell(D)=n+1.
$$

<div class="rr-proof" markdown="1">
<span class="rr-env-title">Check with the correction term</span>

For $$D=n\infty$$,

$$
K-D\sim -(n+2)\infty.
$$

This has negative degree, hence $$\ell(K-D)=0$$. Riemann-Roch gives $$\ell(D)=n+1$$.
</div>

A slightly less standard divisor is

$$
D=2\infty+0.
$$

Then

$$
L(D)=\operatorname{span}\{z^{-1},1,z,z^2\}.
$$

This is the same dimension count, but it shows that the allowed poles need not all sit at infinity. The term $$z^{-1}$$ appears because we explicitly allowed a simple pole at zero.

Another useful check is a divisor supported at three finite points. If $$D=[a]+[b]+[c]$$ with distinct $$a,b,c\in\mathbb C$$, then $$\deg(D)=3$$ and $$\ell(D)=4$$. A basis can be obtained by moving $$D$$ to $$3\infty$$ with a rational function, but the dimension is already forced by Riemann-Roch.

Genus zero has no holomorphic differentials, no Jacobian obstruction, and no special divisor theory beyond degree. That is why it is the right first example, and also why it is misleading if taken as the whole story.

<nav class="rr-nav">
  <a href="/articles/rr-05-the-theorem/"><span>Previous</span>Riemann-Roch 05: The Theorem</a>
  <a class="rr-next" href="/articles/rr-07-genus-one/"><span>Next</span>Riemann-Roch 07: Genus One</a>
</nav>

</article>
