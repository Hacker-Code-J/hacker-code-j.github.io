---
title: "Čech Cohomology 04: Refinements and Leray Covers"
layout: page
categories: Mathematics
tags: [cech-cohomology, refinements, leray-covers]
topics: refinements, direct limits, acyclic intersections, sheaf cohomology
short: "A cover computes sheaf cohomology when its intersections are acyclic for the sheaf."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-04" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 04</p>

# Refinements and Leray covers

<p class="sc-deck">Čech cohomology begins with a cover. Sheaf cohomology is recovered when the cover is fine enough, or better, when it is already acyclic for the sheaf.</p>
</header>

One cover can be too coarse. Refinements organize the correction. The calculus picture gives the right instinct: local primitives exist only after choosing small enough coordinate neighborhoods. For sheaf cohomology, choose a cover where the local problem and every finite-intersection problem are easy enough to compute.

A cover $$\mathfrak V=\{V_\beta\}$$ refines $$\mathfrak U=\{U_i\}$$ if each $$V_\beta$$ lies inside some $$U_{r(\beta)}$$. The refinement map pulls cochains back by restriction:

$$
(r^\# c)_{\beta_0\cdots\beta_q}
=
c_{r(\beta_0)\cdots r(\beta_q)}
\big|_{V_{\beta_0\cdots\beta_q}}.
$$

Because restriction commutes with the coboundary,

$$
\delta r^\#=r^\#\delta,
$$

there are induced maps on Čech cohomology.

## Direct limit over covers

The global Čech cohomology is obtained by taking the direct limit over refinements:

$$
\check H^q(X,\mathcal F)=
\varinjlim_{\mathfrak U}\check H^q(\mathfrak U,\mathcal F).
$$

This definition says that a class should survive all sufficiently fine views of the space. In practice, one tries to avoid the direct limit by choosing a good cover from the start.

## Leray covers

A cover $$\mathfrak U$$ is Leray for $$\mathcal F$$ if every finite intersection

$$
U_{i_0\cdots i_p}
$$

has no higher cohomology for $$\mathcal F$$:

$$
H^q(U_{i_0\cdots i_p},\mathcal F)=0
\qquad(q>0).
$$

When this holds,

$$
\check H^q(\mathfrak U,\mathcal F)\cong H^q(X,\mathcal F).
$$

That is the computational payoff: one cover, one finite-looking complex, the actual sheaf cohomology.

<div class="sc-env" markdown="1">
<span class="sc-env-title">How to choose a cover</span>

Choose open sets and intersections on which the sheaf has simple cohomology. For holomorphic functions on Riemann surfaces, coordinate disks and annuli are usually manageable. For smooth sheaves, partitions of unity make many covers acyclic. For constant sheaves, contractible intersections are the safe choice.
</div>

## Why de Rham likes good covers

The de Rham complex computes cohomology because closed forms are locally exact on coordinate balls:

$$
0\to\underline{\mathbb R}\to
\mathcal A^0\xrightarrow{d}
\mathcal A^1\xrightarrow{d}
\mathcal A^2\to\cdots .
$$

This local exactness is the differential version of choosing a cover where the sheaf problem is easy on each intersection. On a good cover, a closed form can be locally integrated, and the failure of the primitives to agree on overlaps becomes a Čech cocycle. This is why good covers are the natural meeting point of Čech and de Rham computations.

## Good covers

A good cover is one whose finite intersections are empty or contractible. For constant sheaves on reasonable spaces, good covers compute ordinary cohomology. For many geometric sheaves, the analogous goal is to make finite intersections analytically simple enough that higher cohomology vanishes.

<div class="sc-warning" markdown="1">
<span class="sc-env-title">Acyclic depends on the sheaf</span>

The same open set can be harmless for one sheaf and difficult for another. A contractible open set is good for the constant sheaf, but a holomorphic computation may require domains where analytic splitting or logarithms are available.
</div>

## Practical workflow

1. Pick a cover.
2. Compute the Čech complex.
3. Ask whether the cover is Leray for the sheaf.
4. If yes, report $$H^q(X,\mathcal F)$$.
5. If no, refine the cover or switch to an exact sequence or acyclic resolution.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Two-chart cover of $$\mathbb{CP}^1$$</span>

The standard cover $$U_0=\{Z_0\ne0\}$$ and $$U_\infty=\{Z_1\ne0\}$$ has overlap $$\mathbb C^*$$. It is excellent for line bundles because transition functions are visible as Laurent monomials. It is also excellent for many computations of $$\mathcal O(n)$$ because holomorphic functions on the two charts and on the overlap can be compared by Laurent expansion.
</div>

<nav class="sc-nav">
  <a href="/articles/cc-03-degree-zero-and-one/"><span>Previous</span>Degree Zero and One</a>
  <a class="sc-next" href="/articles/cc-05-line-bundles-transition-functions/"><span>Next</span>Line Bundles as Transition Functions</a>
</nav>

</article>
