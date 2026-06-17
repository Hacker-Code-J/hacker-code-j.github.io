---
title: "Čech Cohomology 05: Line Bundles as Transition Functions"
layout: page
categories: Mathematics
tags: [cech-cohomology, line-bundles, transition-functions]
topics: transition functions, H1 O star, gauge changes, Picard group
short: "Line bundles are multiplicative Čech 1-cocycles modulo changes of local frame."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-05" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 05</p>

# Line bundles as transition functions

<p class="sc-deck">A line bundle is local trivial data plus overlap comparisons. Čech cohomology records exactly when those comparisons can be removed by changing local frames.</p>
</header>

Line bundles are the first place where the overlap method becomes geometry rather than just notation. A local frame is a local choice; a transition function is the comparison on an overlap; a change of frame is a coboundary.

Let $$L$$ be a holomorphic line bundle on a complex manifold $$X$$. Choose a cover $$\{U_i\}$$ that trivializes $$L$$. On overlaps, local frames differ by nowhere-zero holomorphic functions

$$
g_{ij}\in\mathcal O_X^*(U_{ij}).
$$

On triple overlaps the transition functions satisfy

$$
g_{ij}g_{jk}=g_{ik}.
$$

Equivalently,

$$
g_{ij}g_{jk}g_{ki}=1.
$$

This is the multiplicative Čech 1-cocycle condition.

## Gauge changes are coboundaries

Changing local frames by units $$h_i\in\mathcal O_X^*(U_i)$$ changes the transitions by

$$
g'_{ij}=h_i g_{ij}h_j^{-1}.
$$

Thus the isomorphism class of the line bundle is the class of the multiplicative cocycle:

$$
\operatorname{Pic}(X)\cong H^1(X,\mathcal O_X^*).
$$

<div class="sc-env" markdown="1">
<span class="sc-env-title">Practical reading</span>

To identify a line bundle, write transition functions on overlaps. To show it is trivial, solve

$$
g_{ij}=h_jh_i^{-1}
$$

or the inverse convention dictated by your frame choice. If such $$h_i$$ exist, the cocycle is a coboundary.
</div>

## Sections of a line bundle

After choosing local frames, a local section of $$L$$ is represented by functions $$s_i\in\mathcal O_X(U_i)$$. These functions define a global section exactly when they satisfy the transition rule

$$
s_j=g_{ij}s_i
$$

on overlaps, or the inverse rule if the local-frame convention is reversed.

This is the same Čech test as degree zero, but with the gluing equation twisted by the bundle. In computations, the transition functions determine which local functions are allowed to patch.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Two-chart picture</span>

On $$\mathbb{CP}^1$$ with coordinates $$z$$ and $$w=1/z$$, a line bundle $$\mathcal O(n)$$ is represented by a transition function $$z^n$$ on $$\mathbb C^*$$. A section is a pair of holomorphic functions on the two charts whose values match after multiplying by this transition.
</div>

## Why this helps sheaf cohomology

Many computations involve exact sequences such as

$$
0\to\mathbb Z\to\mathcal O_X\to\mathcal O_X^*\to0
$$

or divisor sequences involving $$\mathcal O_X(D)$$. Čech representatives make the local choices explicit: transition functions give the bundle, sections give degree-zero data, and higher cohomology records which overlap sections cannot be killed by changing local functions.

<nav class="sc-nav">
  <a href="/articles/cc-04-refinements-and-leray-covers/"><span>Previous</span>Refinements and Leray Covers</a>
  <a class="sc-next" href="/articles/cc-06-first-chern-class-exponential-sequence/"><span>Next</span>First Chern Class</a>
</nav>

</article>
