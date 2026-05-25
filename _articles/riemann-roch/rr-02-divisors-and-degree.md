---
title: "Riemann-Roch 02: Divisors and Degree"
layout: page
categories: Mathematics
tags: [riemann-roch, divisors, degree]
topics: divisors, effective divisors, principal divisors, degree
short: "Zeros and poles recorded as finite arithmetic data."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-02" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / II</p>

# Divisors before the theorem

<p class="rr-deck">Before the theorem can count anything, zeros and poles have to be turned into a finite object that can be added, compared, and moved.</p>
</header>

A divisor is a finite formal integer sum of points,

$$
D=\sum_P n_P P.
$$

It is deliberately simple. A point receives an integer coefficient; all but finitely many coefficients are zero. This is enough to record the local orders of zeros and poles of meromorphic functions.

The degree is

$$
\deg(D)=\sum_P n_P.
$$

The support is the set of points where $$n_P\ne 0$$. A divisor is effective, written $$D\ge 0$$, if every coefficient is nonnegative.

## Principal divisors

If $$f$$ is a nonzero meromorphic function, define

$$
(f)=\sum_P \operatorname{ord}_P(f)P.
$$

Positive order means a zero, negative order means a pole. Such divisors are called principal.

<div class="rr-env" markdown="1">
<span class="rr-env-title">Basic fact</span>

On a compact Riemann surface,

$$
\deg((f))=0.
$$
</div>

One way to see this is to use the logarithmic differential $$df/f$$. Its residue at $$P$$ is $$\operatorname{ord}_P(f)$$. The residue theorem gives

$$
0=\sum_P \operatorname{res}_P(df/f)=\sum_P \operatorname{ord}_P(f).
$$

## The sign convention

The condition defining $$L(D)$$ is

$$
(f)+D\ge 0.
$$

Thus positive coefficients of $$D$$ allow poles. For instance, if

$$
D=3P+Q,
$$

then $$f\in L(D)$$ may have a pole of order at most three at $$P$$ and a pole of order at most one at $$Q$$. If

$$
D=3P-2Q,
$$

then $$f$$ may still have a pole of order at most three at $$P$$, but it must vanish to order at least two at $$Q$$.

<div class="rr-example" markdown="1">
<span class="rr-env-title">Example on the projective line</span>

On $$\mathbb P^1$$, the affine coordinate satisfies

$$
(z)=0-\infty.
$$

Consequently

$$
(z^m)=m\cdot 0-m\cdot\infty.
$$

This is why powers of $$z$$ live naturally in spaces of the form $$L(n\infty)$$.
</div>

<div class="rr-example" markdown="1">
<span class="rr-env-title">Two principal divisors that are worth knowing</span>

First take distinct finite points $$a,b,c\in\mathbb C$$ and

$$
f(z)=\frac{(z-a)^2}{(z-b)^3(z-c)}
$$

on $$\mathbb P^1$$. The denominator has degree two more than the numerator, so $$f$$ has a zero of order two at infinity. Thus

$$
(f)=2[a]+2[\infty]-3[b]-[c].
$$

This example is a useful antidote to the habit of forgetting the point at infinity.

Second, on the elliptic curve

$$
E: y^2=x^3-x
$$

with point at infinity $$O$$, the coordinate functions have

$$
(x)=2(0,0)-2O,
$$

and

$$
(y)=(0,0)+(1,0)+(-1,0)-3O.
$$

The pole orders $$2$$ and $$3$$ at $$O$$ are the first hints that $$x$$ and $$y$$ will generate the spaces $$L(2O)$$ and $$L(3O)$$ later.
</div>

The definition is modest, but it is the bookkeeping that makes the theorem possible: Riemann-Roch counts functions by reading this divisor data globally.

<nav class="rr-nav">
  <a href="/articles/rr-01-roadmap/"><span>Previous</span>Riemann-Roch 01: Roadmap</a>
  <a class="rr-next" href="/articles/rr-03-meromorphic-functions-and-LD/"><span>Next</span>Riemann-Roch 03: The Space L(D)</a>
</nav>

</article>
