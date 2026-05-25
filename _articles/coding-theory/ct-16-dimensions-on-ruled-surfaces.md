---
title: "Coding Theory 16: Dimensions on Ruled Surfaces"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: symmetric powers, vector bundles, cohomology, stability
short: "The dimension computations of Chapter 6.5-6.6."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-16" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 16</p>

# Dimensions on ruled surfaces

<p class="ct-deck">The dimension of a ruled-surface code is a cohomology problem on the base curve.</p>
</header>

For $$X=\mathbb P(E)\xrightarrow{\pi}C$$ and a divisor corresponding to $$\mathcal O_X(a)\otimes\pi^*\mathcal O_C(bP_0)$$, the projection formula gives

$$
H^0(X,\mathcal L(D))\simeq H^0(C,S^a(E)\otimes\mathcal O_C(bP_0)).
$$

Thus code dimension reduces to vector-bundle cohomology on $$C$$. Riemann-Roch for vector bundles gives

$$
h^0(C,F)-h^1(C,F)=\deg F+\operatorname{rank}(F)(1-g).
$$

The hard part is controlling $$h^1$$.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: decomposable case</span>

If $$E=L_1\oplus L_2$$, then

$$
S^a(E)=\bigoplus_{i=0}^a L_1^i\otimes L_2^{a-i}.
$$

The dimension becomes a sum of line-bundle dimensions on $$C$$.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: product case again</span>

For $$E=\mathcal O\oplus\mathcal O$$ over $$\mathbb P^1$$, $$S^a(E)\simeq\mathcal O^{a+1}$$. Tensoring with $$\mathcal O(b)$$ gives $$h^0=(a+1)(b+1)$$.
</div>

## Riemann-Roch for symmetric powers

For a rank-two vector bundle $$E$$ of degree $$d$$ on a genus $$g$$ curve, the symmetric power $$S^a(E)$$ has rank $$a+1$$ and degree $$da(a+1)/2$$. Therefore

$$
h^0(C,S^a(E)\otimes\mathcal O_C(bP_0))-h^1(C,S^a(E)\otimes\mathcal O_C(bP_0))
=(a+1)\left(b+{da\over2}+1-g\right).
$$

This is the numerical backbone of the dimension formula. Every exact dimension statement in Chapter 6 is obtained by proving that the corresponding $$h^1$$ term vanishes or by computing its contribution.

## Vanishing criteria

The reference gives sufficient conditions forcing $$h^1(C,S^a(E)\otimes\mathcal O_C(bP_0))=0$$. One route uses global generation after twisting; another uses stability and semistability.

A vector bundle $$F$$ is stable if every proper subbundle $$F_0$$ satisfies

$$
{\deg F_0\over\operatorname{rank}F_0}< {\deg F\over\operatorname{rank}F}.
$$

Semistability replaces $$<$$ by $$\le$$. Large enough degree for a semistable bundle implies generation by global sections or vanishing of $$H^1$$.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: line bundles are stable</span>

A line bundle has no nonzero proper subbundle of smaller positive rank, so it is stable. This is why the decomposable line-bundle case is easier than the indecomposable vector-bundle case.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: why $$h^1$$ changes the code dimension</span>

If Riemann-Roch predicts $$h^0-h^1=20$$, then the code dimension is exactly $$20$$ only when $$h^1=0$$. If $$h^1=3$$, then $$h^0=23$$. Lower bounds can be strict, which is precisely the issue in the degree-one elliptic ruled case.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-15-ruled-surface-code-parameters/"><span>Previous</span>Ruled Surface Parameters</a>
  <a class="ct-next" href="/articles/ct-17-elliptic-ruled-surface-codes/"><span>Next</span>Elliptic Ruled Codes</a>
</nav>

</article>
