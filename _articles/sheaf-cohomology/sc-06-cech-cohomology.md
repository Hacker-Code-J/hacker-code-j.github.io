---
title: "Sheaf Cohomology 06: Cech Cohomology"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, cech-cohomology, cocycles]
topics: Cech cochains, coboundary, refinements, H0, H1, line bundle cocycles
short: "Cech cohomology makes gluing obstructions explicit on overlaps."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-06" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 06</p>

# Cech cohomology

<p class="sc-deck">Cech cochains are local data on intersections; their coboundary measures whether the data glue, split, or obstruct.</p>
</header>
{% include sc_bridge_06_cech_from_forms.md %}


Chapter 8 of the PDF develops Cech cohomology. It is the most computational form of sheaf cohomology because every cochain has a visible support: open sets, double overlaps, triple overlaps, and so on.

## Cochains for an open cover

Let $$\mathfrak U=\{U_i\}_{i\in I}$$ be an open cover of $$X$$ and let $$\mathcal F$$ be a sheaf of abelian groups. A $$q$$-cochain assigns a section to each nonempty $$(q+1)$$-fold intersection:

$$
C^q(\mathfrak U,\mathcal F)=
\prod_{i_0<\cdots<i_q}
\mathcal F(U_{i_0}\cap\cdots\cap U_{i_q}).
$$

The coboundary $$\delta:C^q\to C^{q+1}$$ is

$$
(\delta c)_{i_0\cdots i_{q+1}}
=\sum_{r=0}^{q+1}(-1)^r
c_{i_0\cdots\widehat{i_r}\cdots i_{q+1}}
\big|_{U_{i_0}\cap\cdots\cap U_{i_{q+1}}}.
$$

Then $$\delta^2=0$$, so one defines

$$
\check H^q(\mathfrak U,\mathcal F)=
\ker(\delta:C^q\to C^{q+1})/
\operatorname{im}(\delta:C^{q-1}\to C^q).
$$

<div class="sc-proof" markdown="1">
<span class="sc-env-title">Proof sketch of $$\delta^2=0$$</span>

Each term in $$\delta(\delta c)$$ omits two indices. Omitting $$i_r$$ and then $$i_s$$ occurs with the opposite sign from omitting $$i_s$$ and then $$i_r$$. The restrictions land in the same intersection, so the two terms cancel.
</div>

## Degree zero

A 0-cochain is a family $$s_i\in\mathcal F(U_i)$$. It is a 0-cocycle when

$$
s_i|_{U_i\cap U_j}=s_j|_{U_i\cap U_j}.
$$

By the sheaf gluing axiom, this is precisely a global section. Therefore

$$
\check H^0(\mathfrak U,\mathcal F)\cong\Gamma(X,\mathcal F).
$$

## Degree one

A 1-cochain is a family $$a_{ij}\in\mathcal F(U_i\cap U_j)$$. It is a cocycle when

$$
a_{jk}-a_{ik}+a_{ij}=0
$$

on triple intersections, using additive notation. It is a coboundary if there are $$b_i\in\mathcal F(U_i)$$ such that

$$
a_{ij}=b_j-b_i.
$$

Thus $$\check H^1$$ measures compatible overlap data that cannot be obtained as differences of local data.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: line bundles as multiplicative 1-cocycles</span>

For $$\mathcal O_X^*$$, Cech addition is multiplication. A line bundle is represented by functions $$g_{ij}\in\mathcal O^*(U_i\cap U_j)$$ satisfying

$$
g_{ij}g_{jk}g_{ki}=1.
$$

A change of local frame multiplies the cocycle by a coboundary factor. With the additive sign convention above, the multiplicative coboundary of local units $$h_i$$ is $$h_jh_i^{-1}$$; with the frame convention used in Article 01 the transition functions are multiplied by its inverse $$h_i h_j^{-1}$$. These generate the same subgroup of coboundaries, but the inverse matters when comparing formulas term by term. Therefore line bundles on $$X$$ are classes in $$\check H^1(\mathfrak U,\mathcal O^*)$$, and after refinement in $$H^1(X,\mathcal O^*)$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: $$S^1$$ and the constant sheaf $$\mathbb Z$$</span>

Cover $$S^1$$ by two arcs $$U,V$$ whose intersection has two connected components. A 1-cochain for $$\underline{\mathbb Z}$$ assigns one integer to each component of $$U\cap V$$. Coboundaries can shift both components by the same difference of local constants, so the difference between the two integers remains. Hence

$$
\check H^1(S^1,\underline{\mathbb Z})\cong\mathbb Z.
$$

This integer is the winding obstruction.
</div>

## Refinements and direct limits

Cohomology computed from one cover can miss information if the cover is too coarse or intersections are not simple. A refinement $$\mathfrak V\to\mathfrak U$$ induces maps

$$
\check H^q(\mathfrak U,\mathcal F)\to
\check H^q(\mathfrak V,\mathcal F).
$$

The Cech cohomology of $$X$$ is obtained by taking the direct limit over covers:

$$
\check H^q(X,\mathcal F)=\varinjlim_{\mathfrak U}
\check H^q(\mathfrak U,\mathcal F).
$$

For good covers and many geometric sheaves, carefully chosen covers already compute the correct sheaf cohomology.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: the two-chart cover of $$\mathbb{CP}^1$$</span>

Let $$U_0=\mathbb C$$ and $$U_\infty=\mathbb C$$ with overlap $$\mathbb C^*$$. In the convention of Article 01, a multiplicative Cech 1-cocycle $$z^{-n}$$ represents $$\mathcal O(n)$$; the reciprocal convention uses $$z^n$$. The integer $$n$$ is recovered, up to that convention sign, by winding around the overlap annulus. Refining the cover does not remove this class because it records global degree.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: additive splitting on Stein intersections</span>

For the sheaf $$\mathcal O$$ on $$\mathbb{CP}^1$$ with the standard two-chart cover, a 1-cocycle is a Laurent series on $$\mathbb C^*$$. Terms with nonnegative powers extend to $$U_0$$; terms with negative powers extend to $$U_\infty$$. The cocycle splits, giving $$H^1(\mathbb{CP}^1,\mathcal O)=0$$. For $$\mathcal O(-2)$$, a residue-like term survives, giving a one-dimensional $$H^1$$.
</div>

## Interpretation

The Cech complex is a bookkeeping device for local-to-global failure. Degree zero asks whether local sections glue. Degree one asks whether overlap corrections are induced by local choices. Higher degrees repeat this question on higher intersections.

<nav class="sc-nav">
  <a href="/articles/sc-05-morphisms-stalks-and-exactness/"><span>Previous</span>Stalks and Exactness</a>
  <a class="sc-next" href="/articles/sc-07-sheaf-cohomology-and-acyclic-resolutions/"><span>Next</span>Sheaf Cohomology and Acyclic Resolutions</a>
</nav>

</article>
