---
title: "Riemann-Roch 13: Application II - Goppa Codes"
layout: page
categories: Mathematics
tags: [riemann-roch, goppa-code, algebraic-geometry-codes, application]
topics: Goppa codes, parity checks, AG codes, finite fields
short: "Application II: the divisor-space viewpoint behind classical Goppa codes."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-13" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / XIII</p>

# Application II: Goppa codes

<p class="rr-deck">Classical Goppa parity checks are the genus zero shadow of the same Riemann-Roch spaces used in algebraic geometry codes.</p>
</header>

Goppa codes are a coding-theoretic place where the same divisor language becomes computational. The classical construction lives on the projective line, but it is best understood as part of the same family as algebraic geometry codes.

Let $$L=(\alpha_1,\ldots,\alpha_n)$$ be distinct elements of $$\mathbb F_{q^m}$$, and let $$g(x)\in\mathbb F_{q^m}[x]$$ be a polynomial of degree $$r$$ with $$g(\alpha_i)\ne 0$$ for all $$i$$. The classical Goppa code over $$\mathbb F_q$$ is

$$
\Gamma(L,g)=\left\{c\in\mathbb F_q^n:
\sum_{i=1}^n \frac{c_i}{x-\alpha_i}\equiv 0 \pmod{g(x)}\right\}.
$$

Equivalently, it has parity checks over $$\mathbb F_{q^m}$$ of the form

$$
H_{j,i}=\frac{\alpha_i^j}{g(\alpha_i)},
\qquad 0\le j<r.
$$

## Where Riemann-Roch is hiding

On $$\mathbb P^1$$, the space

$$
L((r-1)\infty)=\operatorname{span}\{1,x,\ldots,x^{r-1}\}
$$

has dimension $$r$$ by Riemann-Roch. The rows of the parity-check matrix are evaluations of this basis, twisted by the multipliers $$1/g(\alpha_i)$$. Thus the usual matrix description is the genus zero face of a divisor construction.

The same pattern generalizes: choose rational points for coordinates, choose a divisor controlling allowed poles, and use Riemann-Roch to estimate the dimension of the function space or its dual differential space.

## Two concrete Goppa-code checks

<div class="rr-example" markdown="1">
<span class="rr-env-title">Binary degree-two example</span>

Take $$\mathbb F_8/\mathbb F_2$$ and let

$$
g(x)=x^2+x+1.
$$

Since $$\mathbb F_8^*$$ has order $$7$$, this polynomial has no root in $$\mathbb F_8$$. One may take support $$L=\mathbb F_8$$. The parity-check matrix over $$\mathbb F_8$$ has two rows,

$$
H_{0,i}=\frac{1}{g(\alpha_i)},
\qquad
H_{1,i}=\frac{\alpha_i}{g(\alpha_i)}.
$$

Over $$\mathbb F_2$$ this expands to at most $$2\cdot 3=6$$ binary parity-check rows. Hence the standard dimension bound gives

$$
k\ge n-mr=8-3\cdot 2=2.
$$

Because $$g$$ is square-free, the binary designed distance is at least $$2r+1=5$$.
</div>

<div class="rr-example" markdown="1">
<span class="rr-env-title">What changes for degree three</span>

Over $$\mathbb F_{16}/\mathbb F_2$$, choose a square-free cubic $$g(x)$$ and support points avoiding its roots. Then $$r=3$$ and the parity checks use

$$
1,x,x^2\in L(2\infty).
$$

The binary dimension bound becomes

$$
k\ge n-4\cdot 3=n-12,
$$

and the designed binary distance is at least $$7$$ in the square-free case. The calculation is still a Riemann-Roch count on $$\mathbb P^1$$: degree $$2$$ at infinity gives a three-dimensional check space.
</div>

## Why this is an application, not just an analogy

Riemann-Roch controls the dimensions of the spaces from which evaluation codes and residue checks are built. Classical Goppa codes package the genus zero case into a very efficient parity-check form. Algebraic geometry codes keep the same logic but replace $$\mathbb P^1$$ by higher genus curves, where the genus term in Riemann-Roch changes the parameters.


<nav class="rr-nav">
  <a href="/articles/rr-12-application-algebraic-curve/"><span>Previous</span>Riemann-Roch 12: Application I - Compact Riemann Surfaces Are Algebraic</a>

</nav>

</article>
