---
title: "Coding Theory 05: Dual AG Codes and Residues"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: differential codes, residues, canonical divisors, duality
short: "The residue construction and duality theorem from Chapter 2.2."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-05" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 05</p>

# Dual AG codes and residues

<p class="ct-deck">For AG evaluation codes, the orthogonal code is the corresponding residue code built from rational differentials.</p>
</header>

Let $$\Omega(X)$$ be the space of rational differentials on a smooth projective curve $$X$$. For a divisor $$E$$, set

$$
\Omega(E)=\{\eta\in\Omega(X):\eta\ne0,\;(\eta)-E\ge0\}\cup\{0\}.
$$

With $$D=P_1+\cdots+P_n$$ and $$G$$ disjoint from $$D$$, the differential AG code is

$$
C_\Omega(D,G)=\{(\operatorname{res}_{P_1}\eta,\ldots,\operatorname{res}_{P_n}\eta):\eta\in\Omega(G-D)\}.
$$

Choose a canonical divisor $$K=(\omega)$$. Multiplication by $$\omega$$ identifies $$L(K+D-G)$$ with $$\Omega(G-D)$$. Thus the same code can be expressed through functions:

$$
f\mapsto (\operatorname{res}_{P_i}(f\omega))_{i=1}^n.
$$

## Parameters

The parameter formula runs parallel to the evaluation-code formula. One has

$$
k_\Omega=\ell(K+D-G)-\ell(K-G).
$$

Under the standard degree hypotheses $$2g-2<\deg G<n$$, this becomes

$$
k_\Omega=n-(\deg G+1-g).
$$

The designed distance satisfies

$$
d_\Omega\ge \deg G-(2g-2).
$$

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: residues on $$\mathbb P^1$$ recover parity checks</span>

Let $$P_i$$ be finite points on $$\mathbb P^1$$. A differential with simple poles at the $$P_i$$ and controlled pole behavior at infinity gives residue coordinates. The global residue theorem forces the sum of all residues, including infinity, to vanish, producing parity relations among coordinates.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: Goppa congruences as residue conditions</span>

For support $$L_i\in\mathbb F_{q^m}$$ and a Goppa polynomial $$g(x)$$, the expression

$$
\sum_i {c_i\over x-L_i}\equiv0\pmod{g(x)}
$$

says that a rational differential has residues $$c_i$$ at the support points and vanishing prescribed polar part modulo $$g$$. Classical Goppa parity checks are genus-zero residue checks.
</div>

## Duality

The crucial theorem is

$$
C_\Omega(D,G)=C_L(D,G)^\perp.
$$

The proof is a residue computation. For $$f\in L(G)$$ and $$\eta\in\Omega(G-D)$$, the differential $$f\eta$$ has possible simple poles at the points $$P_i$$ and no other residue contribution. The global residue theorem gives

$$
\sum_i f(P_i)\operatorname{res}_{P_i}(\eta)=0.
$$

Dimension equality then identifies the full orthogonal code.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: dual Reed-Solomon through differentials</span>

The dual of a Reed-Solomon code is again a generalized Reed-Solomon code. In the AG language, the duality is explained by the canonical divisor of $$\mathbb P^1$$ and residues of rational differentials with simple poles at the evaluation points.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: elliptic residue codes</span>

On an elliptic curve, $$\deg K=0$$. If $$G=mO$$, $$D$$ contains $$n$$ points away from $$O$$, and $$0<m<n$$, then the residue code has designed distance at least $$m$$ and dimension $$n-m$$. The same genus correction that affected evaluation code dimension now appears in the dual direction.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-04-ag-evaluation-codes-on-curves/"><span>Previous</span>AG Evaluation Codes</a>
  <a class="ct-next" href="/articles/ct-06-rational-points-and-asymptotic-bounds/"><span>Next</span>Rational Points and Bounds</a>
</nav>

</article>
