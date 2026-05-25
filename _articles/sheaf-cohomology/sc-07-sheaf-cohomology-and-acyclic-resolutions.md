---
title: "Sheaf Cohomology 07: Sheaf Cohomology and Acyclic Resolutions"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, derived-functors, acyclic-resolutions]
topics: injective resolutions, acyclic sheaves, Leray covers, fine soft flabby sheaves
short: "From Cech calculations to the derived functors of global sections."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-07" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 07</p>

# Sheaf cohomology and acyclic resolutions

<p class="sc-deck">Sheaf cohomology is the derived obstruction to taking global sections; acyclic resolutions make it computable.</p>
</header>
{% include sc_bridge_07_derived_from_derham.md %}


Chapter 9 of the PDF explains how Cech cohomology connects to sheaf cohomology. The conceptual definition uses derived functors, while practical computations use resolutions whose higher cohomology vanishes.

## Global sections are left exact

The global-section functor

$$
\Gamma(X,-):\mathcal F\mapsto\mathcal F(X)
$$

is left exact. For a short exact sequence

$$
0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0,
$$

one obtains

$$
0\to\Gamma(X,\mathcal F')\to\Gamma(X,\mathcal F)\to\Gamma(X,\mathcal F''),
$$

but the final map may not be surjective. The right derived functors of $$\Gamma(X,-)$$ are sheaf cohomology:

$$
R^q\Gamma(X,\mathcal F)=H^q(X,\mathcal F).
$$

## Injective resolutions

Choose an injective resolution

$$
0\to\mathcal F\to\mathcal I^0\to\mathcal I^1\to\mathcal I^2\to\cdots.
$$

Apply global sections:

$$
0\to\Gamma(X,\mathcal I^0)\to
\Gamma(X,\mathcal I^1)\to
\Gamma(X,\mathcal I^2)\to\cdots.
$$

Then $$H^q(X,\mathcal F)$$ is the cohomology of this complex. This definition is canonical but usually not computational, because injective sheaves are large and abstract.

<div class="sc-aside" markdown="1">
<span class="sc-env-title">Why derived functors are needed</span>

If global sections were exact, all gluing problems would be solved by local solutions. The exponential sequence and the logarithm on $$\mathbb C^*$$ already show this is false. Derived functors systematically record the successive failures of exactness.
</div>

## Acyclic resolutions

A sheaf $$\mathcal A$$ is $$\Gamma$$-acyclic if

$$
H^q(X,\mathcal A)=0\qquad(q>0).
$$

If $$\mathcal F$$ has an exact resolution by acyclic sheaves,

$$
0\to\mathcal F\to\mathcal A^0\to\mathcal A^1\to\cdots,
$$

then $$H^q(X,\mathcal F)$$ is computed by the global-section complex

$$
0\to\Gamma(X,\mathcal A^0)\to\Gamma(X,\mathcal A^1)\to\cdots.
$$

This is the engine behind de Rham and Dolbeault cohomology.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: de Rham resolution</span>

On a smooth manifold,

$$
0\to\underline{\mathbb R}\to
\mathcal A^0\xrightarrow{d}\mathcal A^1\xrightarrow{d}
\mathcal A^2\xrightarrow{d}\cdots
$$

is exact by the Poincare lemma, and the sheaves $$\mathcal A^k$$ are fine, hence acyclic. Therefore

$$
H^q(X,\underline{\mathbb R})
\cong
H^q(\Gamma(X,\mathcal A^\bullet),d),
$$

which is de Rham cohomology.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: Dolbeault resolution</span>

On a complex manifold, the sheaf of holomorphic functions fits into

$$
0\to\mathcal O_X\to
\mathcal A^{0,0}\xrightarrow{\bar\partial}
\mathcal A^{0,1}\xrightarrow{\bar\partial}
\mathcal A^{0,2}\to\cdots.
$$

The local exactness is the $$\bar\partial$$-Poincare lemma. The sheaves of smooth forms are fine, so

$$
H^q(X,\mathcal O_X)
\cong
H^{0,q}_{\bar\partial}(X).
$$
</div>

## Leray covers and Cech comparison

An open cover $$\mathfrak U$$ is acyclic for $$\mathcal F$$ if every finite intersection $$U_{i_0}\cap\cdots\cap U_{i_q}$$ has

$$
H^p(U_{i_0}\cap\cdots\cap U_{i_q},\mathcal F)=0
\qquad(p>0).
$$

For such a cover,

$$
\check H^q(\mathfrak U,\mathcal F)\cong H^q(X,\mathcal F).
$$

This is often called Leray's theorem. It justifies doing sheaf cohomology by overlap calculations when the cover is chosen well.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: coherent sheaves on Stein covers</span>

For a coherent analytic sheaf on a complex manifold, choose a Stein cover whose finite intersections are Stein, for instance sufficiently small coordinate polydiscs in a good cover. Cartan acyclicity on those intersections lets this cover compute sheaf cohomology by Cech cochains. This is why local analytic coordinates can compute global holomorphic invariants.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: a good cover of a circle</span>

For the constant sheaf $$\underline{\mathbb Z}$$ on $$S^1$$, a cover by two arcs with disconnected intersection is not a good cover. Refining to three arcs with contractible intersections gives the usual cellular cohomology. Both approaches can compute $$H^1(S^1,\mathbb Z)$$, but the good-cover method matches the abstract theorem directly.
</div>

## Fine, soft, and flabby sheaves

The PDF lists three common acyclicity conditions:

| Type | Useful property | Typical example |
| --- | --- | --- |
| fine | partitions of unity act on sections | smooth functions, smooth forms |
| soft | sections over closed sets extend | smooth functions on paracompact manifolds |
| flabby | all restriction maps are surjective | sheaves of discontinuous functions |

Fine sheaves are central in geometry because partitions of unity let one patch local solutions while controlling support.

<nav class="sc-nav">
  <a href="/articles/sc-06-cech-cohomology/"><span>Previous</span>Cech Cohomology</a>
  <a class="sc-next" href="/articles/sc-08-exponential-sequence-and-line-bundles/"><span>Next</span>Exponential Sequence</a>
</nav>

</article>
