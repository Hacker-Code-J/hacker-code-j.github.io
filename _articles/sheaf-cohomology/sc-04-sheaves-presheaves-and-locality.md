---
title: "Sheaf Cohomology 04: Sheaves, Presheaves, and Locality"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, sheaves, presheaves]
topics: presheaves, restriction maps, locality, gluing, examples
short: "The local-to-global axiom that makes sheaves different from arbitrary assignments."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-04" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 04</p>

# Sheaves, presheaves, and locality

<p class="sc-deck">A sheaf is a rule for assigning objects to open sets, together with an exact test for when local data assemble into global data.</p>
</header>
{% include sc_bridge_04_sheaves_from_forms.md %}


Chapter 7 of the PDF begins the abstract language needed for cohomology. The point of sheaves is not abstraction for its own sake: the same two axioms simultaneously describe holomorphic functions, smooth forms, local sections of a bundle, locally constant functions, and divisor data.

## Presheaves

A presheaf $$\mathcal F$$ of abelian groups on a topological space $$X$$ assigns:

1. to each open set $$U\subset X$$ an abelian group $$\mathcal F(U)$$;
2. to each inclusion $$V\subset U$$ a restriction map

$$
\rho^U_V:\mathcal F(U)\to\mathcal F(V)
$$

such that

$$
\rho^U_U=\operatorname{id},\qquad
\rho^V_W\circ\rho^U_V=\rho^U_W
\quad(W\subset V\subset U).
$$

Elements of $$\mathcal F(U)$$ are called sections over $$U$$.

## Sheaf axioms

A presheaf is a sheaf if for every open cover $$U=\bigcup_i U_i$$:

**Locality.** If $$s,t\in\mathcal F(U)$$ and $$s|_{U_i}=t|_{U_i}$$ for all $$i$$, then $$s=t$$.

**Gluing.** If $$s_i\in\mathcal F(U_i)$$ satisfy

$$
s_i|_{U_i\cap U_j}=s_j|_{U_i\cap U_j}
$$

for all $$i,j$$, then there is a unique $$s\in\mathcal F(U)$$ with $$s|_{U_i}=s_i$$.

The first axiom says global sections are determined locally. The second says compatible local sections actually come from a global section.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: holomorphic functions</span>

Let $$X$$ be a complex manifold and set $$\mathcal O_X(U)$$ equal to the ring of holomorphic functions on $$U$$. If two holomorphic functions agree on an open cover, they agree everywhere. If holomorphic functions on the pieces agree on overlaps, they glue to a holomorphic function because holomorphicity is local. Thus $$\mathcal O_X$$ is a sheaf of rings.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: smooth differential forms</span>

The assignment

$$
U\mapsto \mathcal A^k_X(U)
$$

of smooth $$k$$-forms is a sheaf. A form is a collection of smooth coefficient functions in local coordinates, and smoothness can be tested locally. This sheaf becomes central when fine resolutions compute de Rham cohomology.
</div>

## What fails for a presheaf

Some natural assignments have restrictions but fail gluing.

<div class="sc-warning" markdown="1">
<span class="sc-env-title">Non-example 1: bounded holomorphic functions</span>

Let $$\mathcal B(U)$$ be bounded holomorphic functions on $$U$$. Restrictions exist. However, take $$U=\mathbb C$$ and cover it by disks $$U_n=\{|z|<n\}$$. The function $$f_n(z)=z$$ is bounded on each $$U_n$$, and these local sections agree on overlaps. They glue to $$f(z)=z$$ on $$\mathbb C$$, but $$z$$ is not bounded on $$\mathbb C$$. Therefore $$\mathcal B$$ is not a sheaf.
</div>

<div class="sc-warning" markdown="1">
<span class="sc-env-title">Warning: local logarithms are a cohomological obstruction, not a sheaf-axiom failure</span>

On $$\mathbb C^*$$, the function $$z$$ has holomorphic logarithms on simply connected sectors, but no global holomorphic logarithm. This does not mean that $$\mathcal O$$ fails the sheaf axiom: if local branches of $$\log z$$ agreed on overlaps, they would glue. The obstruction is that the branches differ by locally constant multiples of $$2\pi i$$ around the origin, so no compatible family of local logarithms exists.
</div>

## Sheaves of sections

Every vector bundle $$E\to X$$ determines a sheaf $$\mathcal E$$:

$$
\mathcal E(U)=\{\text{holomorphic sections }U\to E\}.
$$

For a line bundle $$L$$ represented by transition functions $$g_{ij}$$, a section over $$U$$ is a family of holomorphic functions $$s_i$$ on $$U\cap U_i$$ satisfying the induced compatibility relation from the transition functions. This is why line bundles and sheaves are equivalent languages for locally free rank-one objects.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: sections of $$\mathcal O(1)$$</span>

For $$\mathbb{CP}^1=U_0\cup U_\infty$$, a section of $$\mathcal O(1)$$ is a pair

$$
s_0(z),\qquad s_\infty(w)
$$

with overlap relation $$s_\infty(w)=z^{-1}s_0(z)=w\,s_0(z)$$ in the section convention of Article 01, or the reciprocal relation if the frames are reversed. The sheaf condition ensures that compatible local expressions define one global section.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: locally constant functions</span>

Let $$\underline{\mathbb Z}$$ be the sheaf of locally constant integer-valued functions. On a connected open set, its sections are constant integers. On a disconnected open set, a section may take different integers on different components. This example is small but important: it remembers topology rather than analytic regularity.
</div>

## Why sheaves enter cohomology

The sheaf axioms make degree zero local-to-global behavior exact. Higher cohomology measures the failure of local compatible data of higher degree to be globally trivial. Thus sheaf cohomology is not an auxiliary formalism; it is the systematic measurement of gluing obstructions.

<nav class="sc-nav">
  <a href="/articles/sc-03-picard-group-and-degree/"><span>Previous</span>Picard Group</a>
  <a class="sc-next" href="/articles/sc-05-morphisms-stalks-and-exactness/"><span>Next</span>Morphisms, Stalks, and Exactness</a>
</nav>

</article>
