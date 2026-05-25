---
title: "Sheaf Cohomology 01: Line Bundles and Transition Functions"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, line-bundles, transition-functions]
topics: holomorphic line bundles, cocycles, gauge changes, tensor products, dual bundles
short: "Line bundles as one-dimensional holomorphic vector bundles assembled by cocycles."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-01" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 01</p>

# Line bundles and transition functions

<p class="sc-deck">A holomorphic line bundle is locally trivial, but the mismatch among local trivializations is the invariant object.</p>
</header>
{% include sc_bridge_01_line_bundles_from_local_data.md %}


Section 6.1 of the PDF introduces holomorphic line bundles through transition functions. This is the correct first model because it makes the later appearance of $$H^1(X,\mathcal O_X^*)$$ almost inevitable: a line bundle is a multiplicative 1-cocycle up to a multiplicative change of local frames.

## Definition by gluing

Let $$X$$ be a complex manifold and let $$\mathfrak U=\{U_i\}$$ be an open cover. A holomorphic line bundle over $$X$$ is obtained by gluing the products $$U_i\times\mathbb C$$ using nowhere-zero holomorphic functions

$$
g_{ij}\in \mathcal O_X^*(U_i\cap U_j)
$$

such that

$$
g_{ii}=1,\qquad g_{ij}g_{ji}=1,\qquad
g_{ij}g_{jk}g_{ki}=1
\quad\text{on }U_i\cap U_j\cap U_k.
$$

The last equation is the cocycle condition. It says that if one moves from chart $$i$$ to chart $$j$$ to chart $$k$$ and back to $$i$$, the fiber coordinate returns unchanged.

Equivalently, define an equivalence relation on the disjoint union $$\coprod_i U_i\times\mathbb C$$ by

$$
(x,v)_i\sim (x,g_{ij}(x)v)_j.
$$

The quotient is the total space of the line bundle.

<div class="sc-env" markdown="1">
<span class="sc-env-title">Local frames and sections</span>

A local frame $$e_i$$ over $$U_i$$ identifies a section $$s$$ with a holomorphic function $$s_i$$ by $$s=s_i e_i$$. With the frame convention used here, on overlaps

$$
e_i=g_{ij}e_j,
\qquad
s_j=g_{ij}s_i.
$$

If one instead lets transition functions convert local coordinate functions rather than frames, all transition functions are inverted. The convention must be fixed once; the invariant statement is compatibility of the local representatives.
</div>

## Gauge changes

The same bundle may be described by different frames. If $$h_i\in\mathcal O_X^*(U_i)$$ and $$e_i'=h_i e_i$$, then the transition functions change to

$$
g'_{ij}=h_i g_{ij}h_j^{-1}.
$$

Since line bundles have scalar transition functions, the product is commutative; the expression is often written as

$$
g'_{ij}=h_i h_j^{-1}g_{ij}.
$$

Thus isomorphism classes of line bundles are cocycles modulo coboundaries. This is the geometric content behind

$$
\operatorname{Pic}(X)\cong H^1(X,\mathcal O_X^*).
$$

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: the trivial bundle is a coboundary</span>

If $$g_{ij}=h_i h_j^{-1}$$ for some nowhere-zero holomorphic functions $$h_i$$, then changing frames by $$e_i'=h_i^{-1}e_i$$ makes every transition function equal to $$1$$. The bundle is globally $$X\times\mathbb C$$. The data may look nontrivial on overlaps, but it disappears after changing the local frames.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: $$\mathcal O(1)$$ on $$\mathbb{CP}^1$$</span>

Let $$U_0=\{Z_0\ne0\}$$ with coordinate $$z=Z_1/Z_0$$ and $$U_\infty=\{Z_1\ne0\}$$ with coordinate $$w=Z_0/Z_1=1/z$$. In the section convention used above, $$\mathcal O(1)$$ has compatibility

$$
s_\infty(w)=z^{-1}s_0(z)=w\,s_0(z).
$$

Equivalently, the reciprocal frame convention uses transition function $$z$$. The two independent global sections are represented by the homogeneous coordinates $$Z_0,Z_1$$: in these local functions they appear as $$(s_0,s_\infty)=(1,w)$$ and $$(z,1)$$.
</div>

## Operations

If $$L$$ and $$M$$ have transition functions $$g_{ij}$$ and $$h_{ij}$$, then

$$
L\otimes M:\quad g_{ij}h_{ij},
\qquad
L^\vee:\quad g_{ij}^{-1}.
$$

The trivial bundle is the identity element, and dualization gives inverses in the Picard group. This is why line bundles form an abelian group under tensor product.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: canonical bundle on a Riemann surface</span>

For a Riemann surface, the canonical bundle $$K_X$$ has local frame $$dz_i$$ in a holomorphic coordinate $$z_i$$. If $$z_j=z_j(z_i)$$, then

$$
dz_j={dz_j\over dz_i}\,dz_i.
$$

Thus the coordinate-change derivative gives the frame relation. On $$\mathbb{CP}^1$$, with $$w=1/z$$,

$$
dw=-z^{-2}\,dz,
\qquad
dz=-z^2\,dw.
$$

With the frame convention of this article, $$e_0=dz$$ and $$e_\infty=dw$$ satisfy $$e_0=-z^2e_\infty$$. Since $$\mathcal O(n)$$ has transition $$z^{-n}$$ in this convention, this is $$K_{\mathbb{CP}^1}\cong\mathcal O(-2)$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: a flat bundle on an elliptic curve</span>

Let $$E=\mathbb C/\Lambda$$. A character $$\chi:\Lambda\to\mathbb C^*$$ defines a line bundle

$$
(\mathbb C\times\mathbb C)/\Lambda,
\qquad
\lambda\cdot(z,v)=(z+\lambda,\chi(\lambda)v).
$$

If $$|\chi(\lambda)|=1$$ for all $$\lambda$$, this is a unitary flat line bundle. Its degree is zero; for nontrivial unitary $$\chi$$ it is not holomorphically trivial. This example separates topological degree from holomorphic isomorphism class.
</div>

## What the cocycle records

The transition functions do not describe a line bundle as a set of unrelated local products. They measure the obstruction to choosing one global nowhere-zero frame. If the obstruction vanishes, all local frames can be rescaled into a single global frame. If it does not vanish, the bundle is locally simple but globally twisted.

<nav class="sc-nav">
  <a href="/articles/sheaf-cohomology/"><span>Previous</span>Roadmap</a>
  <a class="sc-next" href="/articles/sc-02-divisors-and-associated-line-bundles/"><span>Next</span>Divisors and Associated Line Bundles</a>
</nav>

</article>
