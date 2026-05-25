---
title: "Coding Theory 17: Elliptic Ruled Surface Codes"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: elliptic curves, Atiyah classification, degree zero, degree one, Lomont
short: "The elliptic ruled surface material of Chapter 6.7."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-17" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 17</p>

# Elliptic ruled surface codes

<p class="ct-deck">Ruled surfaces over elliptic curves are the point where vector-bundle classification enters the code parameter problem.</p>
</header>

Let $$C/\mathbb F_q$$ be an elliptic curve with $$\gamma=\#C(\mathbb F_q)$$. For $$X=\mathbb P(E)\to C$$, the natural evaluation length is

$$
n=(q+1)\gamma.
$$

Rank-two indecomposable vector bundles over elliptic curves are controlled by the classification of Atiyah, extended in the finite-field setting used here through Arason-Elman-Jacob. In the normalized indecomposable rank-two case, the degree is $$0$$ or $$1$$.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: degree-zero indecomposable case</span>

For a normalized indecomposable degree-zero bundle $$E$$ and integers $$0<b<\gamma$$, $$0\le a<q+1$$, one obtains codes with

$$
n=(q+1)\gamma,\qquad k=(a+1)b,\qquad d\ge(q+1-a)(\gamma-b)
$$

In this range, the dimension is exact because the symmetric powers decompose in a way controlled by the elliptic vector-bundle classification.
</div>

<div class="ct-proof" markdown="1">
<span class="ct-env-title">Proof audit</span>

For a normalized indecomposable degree-zero bundle, the Atiyah-Arason-Elman-Jacob classification decomposes $$S^a(E)$$ as a direct sum of indecomposable degree-zero bundles $$F_{r_i}$$ with total rank $$\sum_i r_i=a+1$$. After twisting by $$\mathcal O_C(bP_0)$$ with $$b>0$$, each summand is semistable of positive degree, so $$H^1=0$$. Since an elliptic curve has genus $$1$$, vector-bundle Riemann-Roch gives

$$
h^0(F_{r_i}\otimes\mathcal O_C(bP_0))=\deg(F_{r_i}\otimes\mathcal O_C(bP_0))=r_i b.
$$

Summing over $$i$$ gives $$k=b\sum_i r_i=(a+1)b$$.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: the product formula reappears with $$\gamma$$</span>

Compare the product formula $$(q+1)^2,(a+1)(b+1),(q+1-a)(q+1-b)$$ with the elliptic degree-zero formula. The base line $$\mathbb P^1$$ is replaced by an elliptic curve with $$\gamma$$ rational points, and the genus-one cohomology changes $$b+1$$ into $$b$$.
</div>

## Degree-one case

For the normalized indecomposable degree-one bundle, under the same range $$0<b<\gamma$$, $$0\le a<q+1$$, the distance lower bound has the shape

$$
d\ge(q+1-a)(\gamma-a-b).
$$

This is a useful positive distance estimate in the subrange $$a+b<\gamma$$. In that subrange the same estimate also excludes a nonzero section vanishing on every evaluation point, so the germ map is injective and the section-space dimension is the code dimension. Outside that subrange the construction still gives an evaluation code, but this particular Hansen-Lomont lower bound is vacuous and injectivity has to be checked separately.

The dimension lower bound is

$$
k\ge(a+1)\left(b+{a\over2}\right),
$$

and it becomes exact under additional hypotheses such as $$b>a$$ in the Chapter 6 discussion. The unresolved issue is the contribution of $$h^1(S^a(E)\otimes\mathcal O_C(bP_0))$$ in the remaining range.

<div class="ct-proof" markdown="1">
<span class="ct-env-title">Proof audit</span>

In degree one the ruled surface is ample, so the fiber-component parameter is $$m=b-ae=b+a$$ because the invariant is $$e=-1$$. Hansen-Lomont then gives

$$
d\ge(q+1-a)(\gamma-a-b).
$$

For the dimension, $$\deg E=1$$ and

$$
\operatorname{rank}S^a(E)=a+1,\qquad \deg S^a(E)={a(a+1)\over2}.
$$

After twisting by $$\mathcal O_C(bP_0)$$, Riemann-Roch on the elliptic base gives

$$
h^0-h^1=(a+1)b+{a(a+1)\over2}=(a+1)\left(b+{a\over2}\right).
$$

Thus the displayed formula is always a lower bound, and it is exact precisely in the ranges where the first cohomology term vanishes.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: why degree one can look worse numerically</span>

If only a lower bound for $$k$$ is known, then rate estimates may understate the true performance. The table comparing degree-zero and degree-one cases should be read with this asymmetry in mind.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: obstruction as missing cohomology</span>

The problem is not the length or the fiber distance estimate. It is the inability to compute the decomposition of $$S^a(E)$$ well enough to determine the first cohomology term for all $$a,b$$. This is the Lomont gap addressed only partially by the available decomposition methods.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-16-dimensions-on-ruled-surfaces/"><span>Previous</span>Ruled Surface Dimensions</a>
  <a class="ct-next" href="/articles/ct-18-open-problems-and-research-map/"><span>Next</span>Open Problems</a>
</nav>

</article>
