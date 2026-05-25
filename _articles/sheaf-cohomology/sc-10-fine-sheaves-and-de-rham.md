---
title: "Sheaf Cohomology 10: Fine Sheaves, de Rham, and Dolbeault"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, de-rham, dolbeault]
topics: fine sheaves, partitions of unity, Poincare lemma, de Rham theorem, Dolbeault resolution
short: "Fine resolutions turn differential forms into sheaf cohomology computations."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-10" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 10</p>

# Fine sheaves, de Rham, and Dolbeault

<p class="sc-deck">Partitions of unity make smooth sheaves acyclic; the Poincare lemma then converts local exactness into global cohomology.</p>
</header>

Chapter 12 of the PDF explains why differential forms compute topological and holomorphic cohomology. The mechanism is always the same: resolve a difficult sheaf by fine sheaves, then take global sections.
 
{% include sheaf_cohomology_derham_intro.md %}


## Fine sheaves

A sheaf $$\mathcal F$$ on a paracompact space is fine if partitions of unity act on it strongly enough to localize sections. For smooth manifolds, the sheaves

$$
\mathcal A^k_X
$$

of smooth $$k$$-forms are fine because smooth bump functions multiply forms. Fine sheaves are acyclic:

$$
H^q(X,\mathcal A^k_X)=0\qquad(q>0).
$$

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: smooth functions</span>

The sheaf $$\mathcal C^\infty_X$$ is fine. Given a locally finite open cover and a partition of unity $$\{\rho_i\}$$ subordinate to it, a local function can be cut off by $$\rho_i$$ and extended by zero. This is exactly the operation that fails holomorphically: holomorphic bump functions do not exist on connected complex manifolds.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 5: smooth forms</span>

If $$\omega_i\in\mathcal A^k(U_i)$$ are local forms, then $$\rho_i\omega_i$$ extends smoothly by zero to $$X$$. This support control is why smooth form sheaves are acyclic and why de Rham theory can be globalized by local computations.
</div>

## Poincare lemma and de Rham resolution

The Poincare lemma says that on a sufficiently small ball,

$$
d\omega=0,\quad k>0
\qquad\Longrightarrow\qquad
\omega=d\eta.
$$

Equivalently, the sequence of sheaves

$$
0\to\underline{\mathbb R}\to
\mathcal A^0\xrightarrow{d}\mathcal A^1\xrightarrow{d}
\mathcal A^2\xrightarrow{d}\cdots
$$

is exact. Since the $$\mathcal A^k$$ are fine, this is an acyclic resolution of $$\underline{\mathbb R}$$. Therefore

$$
H^q(X,\underline{\mathbb R})
\cong
H^q_{\mathrm{dR}}(X).
$$

This is the de Rham theorem in sheaf language.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 6: the circle</span>

On $$S^1=\mathbb R/2\pi\mathbb Z$$, the invariant 1-form usually written $$d\theta$$ is locally exact but not globally exact on the circle. Its integral around $$S^1$$ is $$2\pi$$. Sheaf-theoretically, local primitives fail to glue by a locally constant Cech 1-cocycle, producing $$H^1(S^1,\mathbb R)\cong\mathbb R$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 7: the two-sphere</span>

The area form $$\omega_{S^2}$$ is closed and represents a generator of $$H^2(S^2,\mathbb R)$$ after normalization. It cannot be exact because

$$
\int_{S^2}\omega_{S^2}\ne0,
$$

while the integral of an exact 2-form over a closed surface would be zero by Stokes.
</div>

## Mayer-Vietoris from forms

For $$X=U\cup V$$, the short exact sequence of form complexes

$$
0\to\mathcal A^\bullet(X)\to
\mathcal A^\bullet(U)\oplus\mathcal A^\bullet(V)\to
\mathcal A^\bullet(U\cap V)\to0
$$

leads to the Mayer-Vietoris long exact sequence in de Rham cohomology. The connecting map is built by taking a form on the overlap, splitting it with a partition of unity, and differentiating the pieces.

## Dolbeault resolution

On a complex manifold, smooth complex forms decompose into type $$(p,q)$$. The operator

$$
\bar\partial:\mathcal A^{p,q}\to\mathcal A^{p,q+1}
$$

satisfies $$\bar\partial^2=0$$. The $$\bar\partial$$-Poincare lemma gives an exact sequence

$$
0\to\Omega^p_X\to
\mathcal A^{p,0}\xrightarrow{\bar\partial}
\mathcal A^{p,1}\xrightarrow{\bar\partial}
\mathcal A^{p,2}\to\cdots,
$$

where $$\Omega^p_X$$ is the sheaf of holomorphic $$p$$-forms. Since the smooth form sheaves are fine,

$$
H^q(X,\Omega^p_X)\cong H^{p,q}_{\bar\partial}(X).
$$

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 8: holomorphic functions on compact Riemann surfaces</span>

For $$p=0$$ on a compact Riemann surface,

$$
H^0(X,\mathcal O_X)
$$

is the kernel of $$\bar\partial:\mathcal A^{0,0}(X)\to\mathcal A^{0,1}(X)$$. These are global holomorphic functions, hence constants when $$X$$ is connected.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 9: $$H^1(X,\mathcal O_X)$$</span>

The group $$H^1(X,\mathcal O_X)$$ is represented by global $$(0,1)$$-forms modulo $$\bar\partial$$ of smooth functions:

$$
H^1(X,\mathcal O_X)\cong
\mathcal A^{0,1}(X)/
\bar\partial\mathcal A^{0,0}(X).
$$

For a genus $$g$$ compact Riemann surface, this vector space has dimension $$g$$.
</div>

## The lesson

Fine resolutions are what make analysis and sheaf theory meet. Local differential equations provide exactness; partitions of unity provide acyclicity; global cohomology is the finite-dimensional remainder that cannot be solved away.

<nav class="sc-nav">
  <a href="/articles/sc-09-long-exact-sequences/"><span>Previous</span>Long Exact Sequences</a>
  <a class="sc-next" href="/articles/sc-11-canonical-bundles-chern-classes-curvature/"><span>Next</span>Canonical Bundles and Curvature</a>
</nav>

</article>
