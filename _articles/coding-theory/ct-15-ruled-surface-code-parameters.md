---
title: "Coding Theory 15: Ruled Surface Code Parameters"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: ruled-surface codes, rational ruled surfaces, product codes
short: "The parameter theorems of Chapter 6.3-6.4."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-15" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 15</p>

# Ruled surface code parameters

<p class="ct-deck">Ruled surfaces give surface codes where length and distance can be estimated fiber by fiber.</p>
</header>

Let $$X=\mathbb P(E)\to C$$ be a ruled surface over $$\mathbb F_q$$. Suppose $$C$$ has $$\gamma$$ rational points. Each rational fiber has $$q+1$$ rational points, so the natural evaluation set has length

$$
n=(q+1)\gamma.
$$

For divisors $$D=aC_0+bf$$, sections restrict to degree $$a$$ polynomials on each fiber. Hansen bound then yields distance estimates involving the number of fibers contained in a zero divisor and the intersection degree on the remaining fibers.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: product of two projective lines</span>

For $$X=\mathbb P^1\times\mathbb P^1$$, with $$D=aF_1+bF_2$$ and $$0\le a,b<q+1$$, the code from all rational points has

$$
n=(q+1)^2,\qquad k=(a+1)(b+1),\qquad d\ge(q+1-a)(q+1-b).
$$

This is the product Reed-Solomon behavior.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: why the fiber bound has this shape</span>

For the chosen evaluation ruling, a section can vanish identically on at most $$b$$ evaluation fibers. On every other evaluation fiber it has at most $$a$$ zeros. Thus the zero count is at most $$b(q+1)+(q+1-b)a$$, giving the distance bound above.
</div>

## General ruled-surface bound

Write a divisor class as $$D=aC_0+bf$$. Let $$m$$ be the maximum number of rational fibers that can be components of a zero divisor in the linear system. In the non-ample case treated in Chapter 6 this is expressed by a number of the form $$m=a(\lceil\kappa\rceil-e)+b$$, while in the ample case it is governed by $$m=b-ae$$.
Here $$\kappa$$ is the positivity threshold from the ruled-surface ample/nef criterion; when $$e\ge0$$ in the decomposable non-ample case, $$\kappa=e$$ and the formula reduces to $$m=b$$.
The fiberwise Hansen estimate gives the bound

$$
d\ge n-(\gamma-m)a-(q+1)m,
$$

under the theorem hypotheses

$$
m<\gamma,\qquad \gamma(q+1)\ge (\gamma-m)a+(q+1)m.
$$

The second inequality is the numerical condition used in the theorem. For the clean injective-evaluation conclusion used in parameter computations, the strict form

$$
(q+1)\gamma>(\gamma-m)a+(q+1)m
$$

gives a positive distance lower bound and hence no nonzero section can vanish on all evaluation points. At equality the distance estimate only gives $$d\ge0$$, so injectivity should be checked separately or obtained from the sharper hypotheses of the particular family. This is the common source of the formulas for rational and elliptic ruled surfaces.

<div class="ct-proof" markdown="1">
<span class="ct-env-title">Proof audit</span>

Apply Hansen's bound to the rational fibers $$f_1,\ldots,f_\gamma$$. Each has at most $$q+1$$ rational points and $$D\cdot f_i=a$$. If at most $$m$$ fibers are components of a zero divisor, then a nonzero section can vanish at no more than

$$
m(q+1)+(\gamma-m)a
$$

evaluation points. Hence

$$
d\ge (q+1)\gamma-m(q+1)-(\gamma-m)a=n-(\gamma-m)a-(q+1)m.
$$

The number $$m$$ comes from intersecting the zero divisor with a nef divisor: in the non-ample case Chapter 6 uses a nef class governed by $$\kappa$$, giving $$m=a(\lceil\kappa\rceil-e)+b$$; in the ample case $$C_0$$ is nef and gives $$m=b-ae$$.
</div>


## Rational ruled surfaces

Over $$\mathbb P^1$$, rank-two bundles split, so rational ruled surfaces are controlled by decomposable bundles. This makes dimension computations explicit and connects the resulting codes to product-type evaluation codes. Chapter 6 compares their relative parameters with the Gilbert-Varshamov benchmark and with product Reed-Solomon intuition.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: decomposable bundle over $$\mathbb P^1$$</span>

If $$E=\mathcal O\oplus\mathcal O(-e)$$ with $$e\ge0$$, then

$$
S^a(E)=\bigoplus_{j=0}^a \mathcal O(-ej).
$$

For $$0\le a<q+1$$ and $$0\le b<q+1$$, the rational ruled-surface code has

$$
n=(q+1)^2,\qquad d\ge(q+1-a)(q+1-b),
$$

and

$$
k=\sum_{0\le j\le a,\; ej\le b}(b-ej+1).
$$

For $$e=0$$ this becomes $$k=(a+1)(b+1)$$, the product case.

The dimension formula is just cohomology on $$\mathbb P^1$$:

$$
H^0\bigl(\mathbb P^1,\mathcal O(b-ej)\bigr)
$$

has dimension $$b-ej+1$$ when $$b-ej\ge0$$ and dimension $$0$$ otherwise. Summing over the symmetric-power decomposition gives the displayed value of $$k$$.

</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: rate-distance tradeoff on the product</span>

Taking larger $$a$$ and $$b$$ raises $$k=(a+1)(b+1)$$ but lowers $$d\ge(q+1-a)(q+1-b)$$. The two ruling directions make the tradeoff rectangular rather than one-dimensional.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-14-ruled-surfaces-geometry/"><span>Previous</span>Ruled Geometry</a>
  <a class="ct-next" href="/articles/ct-16-dimensions-on-ruled-surfaces/"><span>Next</span>Ruled Surface Dimensions</a>
</nav>

</article>
