---
title: "Riemann-Roch 10: Residues and Codes"
layout: page
categories: Mathematics
tags: [riemann-roch, residues, goppa-codes]
topics: residues, algebraic geometry codes, Goppa code intuition
short: "How Riemann-Roch spaces enter evaluation and residue codes."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-10" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / X</p>

# Residues, duality, and codes

<p class="rr-deck">The same divisor spaces that count meromorphic functions become message spaces and dual checks in algebraic geometry codes.</p>
</header>

Let $$X$$ be a smooth projective curve over a finite field $$\mathbb F_q$$. Choose rational points

$$
P_1,\ldots,P_n
$$

and a divisor $$G$$ whose support avoids them. Evaluation gives a linear map

$$
L(G)\longrightarrow \mathbb F_q^n,
\qquad
f\longmapsto (f(P_1),\ldots,f(P_n)).
$$

Its image is an algebraic geometry code.

Riemann-Roch enters because it estimates the dimension of $$L(G)$$. If $$\deg(G)>2g-2$$, then

$$
\ell(G)=\deg(G)+1-g.
$$

If also $$\deg(G)<n$$, the evaluation map is injective, so this is the code dimension.

## The dual residue picture

There is a differential construction as well. A differential can be sent to its residues at the chosen points:

$$
\omega\longmapsto
(\operatorname{res}_{P_1}\omega,\ldots,\operatorname{res}_{P_n}\omega).
$$

The global residue theorem gives a built-in relation,

$$
\sum_P \operatorname{res}_P(\omega)=0.
$$

This is the same duality that appears in Riemann-Roch through the canonical divisor.

<div class="rr-aside" markdown="1">
<span class="rr-env-title">Connection with Goppa codes</span>

Classical Goppa codes are genus zero relatives of this construction. Support points give coordinates; a Goppa polynomial controls poles and parity checks. In higher genus, divisors and Riemann-Roch replace the elementary rational-function count.
</div>

Two parameter checks show what this means.

For a Reed-Solomon code, take $$X=\mathbb P^1$$ over $$\mathbb F_q$$, choose $$n$$ finite rational points, and put $$G=(k-1)\infty$$. Then

$$
L(G)=\operatorname{span}\{1,z,\ldots,z^{k-1}\},
$$

so the message dimension is $$k$$. This is the genus zero case of the AG-code construction.

For an elliptic curve code, take a curve $$E/\mathbb F_q$$, rational evaluation points avoiding $$O$$, and $$G=dO$$ with $$0<d<n$$. Since $$g=1$$ and $$K\sim 0$$,

$$
\ell(G)=d.
$$

The designed distance is at least $$n-d$$. Compared with the projective-line example, the same divisor count now carries genus one geometry.

The useful lesson is structural: length comes from chosen rational points, dimension comes from a Riemann-Roch space, and dual checks are naturally expressed through differentials and residues.

<nav class="rr-nav">
  <a href="/articles/rr-09-cohomological-form/"><span>Previous</span>Riemann-Roch 09: Cohomological Form</a>
  <a class="rr-next" href="/articles/rr-11-computation-checklist/"><span>Next</span>Riemann-Roch 11: Computation Checklist</a>
</nav>

</article>
