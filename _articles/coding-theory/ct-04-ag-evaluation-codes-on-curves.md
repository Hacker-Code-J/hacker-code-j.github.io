---
title: "Coding Theory 04: AG Evaluation Codes on Curves"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: evaluation codes, dimension, distance, curve examples
short: "The main construction of Chapter 2.1."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-04" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 04</p>

# AG evaluation codes on curves

<p class="ct-deck">Goppa idea is to evaluate functions with controlled poles at many rational points of a curve.</p>
</header>

Let $$X/\mathbb F_q$$ be a smooth projective curve. Choose rational points $$P_1,\ldots,P_n$$ and let $$D=P_1+\cdots+P_n$$. Let $$G$$ be a divisor with support disjoint from $$D$$. The evaluation code is

$$
C_L(D,G)=\{(f(P_1),\ldots,f(P_n)):f\in L(G)\}\subseteq\mathbb F_q^n.
$$

The evaluation map is linear. Its kernel is $$L(G-D)$$, because those functions vanish at every evaluation point. Hence

$$
k=\ell(G)-\ell(G-D).
$$

If $$n>\deg G$$, then $$L(G-D)=0$$ and $$k=\ell(G)$$. If also $$\deg G>2g-2$$, Riemann-Roch gives

$$
k=\deg G+1-g.
$$

## Distance bound

A nonzero function $$f\in L(G)$$ has at most $$\deg G$$ zeros among the evaluation points, counted with multiplicity. Therefore every nonzero codeword has weight at least

$$
d\ge n-\deg G.
$$

This is the curve analogue of the fact that a nonzero degree $$m$$ polynomial has at most $$m$$ roots.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: Reed-Solomon as the genus-zero case</span>

Take $$X=\mathbb P^1$$, $$G=(k-1)P_\infty$$, and evaluate at $$n$$ finite rational points. Then $$L(G)$$ consists of polynomials of degree at most $$k-1$$. The code has parameters $$[n,k,n-k+1]_q$$ when the evaluation points are distinct.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: one-point elliptic codes</span>

Let $$X$$ be an elliptic curve with $$N$$ rational points. Choose $$D$$ as the sum of $$n=N-1$$ rational points away from $$O$$ and take $$G=mO$$ with $$0<m<n$$. Then $$k=m$$ and $$d\ge n-m$$. The construction resembles Reed-Solomon but uses functions on a genus-one curve.
</div>

## Why many rational points matter

For fixed genus and pole degree, more rational evaluation points increase length without reducing dimension. This is why Chapter 2 quickly moves from the definition of AG codes to rational point counts and asymptotic bounds.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: same divisor, different length</span>

If two elliptic curves over $$\mathbb F_q$$ have different numbers of rational points, the same choice $$G=mO$$ produces the same dimension estimate but different possible lengths. The curve with more rational points gives a longer code at the same pole budget.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: support disjointness is not cosmetic</span>

If $$G=mO$$ and one tries to evaluate at $$O$$, functions in $$L(G)$$ may have a pole there. The code definition requires evaluation points outside $$\operatorname{supp}(G)$$ unless one chooses local normalizations that lead only to monomially equivalent variants.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-03-curves-divisors-riemann-roch/"><span>Previous</span>Curves and Riemann-Roch</a>
  <a class="ct-next" href="/articles/ct-05-dual-ag-codes-and-residues/"><span>Next</span>Dual AG Codes and Residues</a>
</nav>

</article>
