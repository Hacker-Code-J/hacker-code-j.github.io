---
title: "Ring Theory 00: Roadmap from Rings to Affine Schemes"
layout: page
categories: Mathematics
tags: [ring-theory, commutative-algebra, affine-schemes]
topics: rings, prime ideals, Spec, structure sheaf, coherent sheaves
short: "A route from commutative rings to affine schemes and coherent sheaves."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include ring_theory_article_style.html %}

<article class="rt-note rt-note-00" markdown="1">

<header class="rt-note-head" markdown="1">
<p class="rt-series">Ring theory / 00</p>

# Roadmap from rings to affine schemes

<p class="rt-deck">The guiding principle is that a commutative ring is a ring of functions on a space not yet visible. Prime ideals are the points, localization is restriction to basic open sets, and sheaves record how the local rings glue.</p>
</header>

This series develops the ring-theoretic path to affine schemes and coherent sheaves. The reference for the commutative algebra is Atiyah and Macdonald, *Introduction to Commutative Algebra*: rings and ideals from Chapter 1, modules from Chapter 2, localization from Chapter 3, Noetherian finiteness from Chapters 6 and 7, and dimension-theoretic language from Chapter 11.

The aim is not to reproduce the reference. It is to teach the material in a way that keeps the algebra-geometry dictionary visible at every step:

$$
A \quad\leadsto\quad \operatorname{Spec} A
\quad\leadsto\quad
(\operatorname{Spec} A,\mathcal O_{\operatorname{Spec}A})
\quad\leadsto\quad
\widetilde M.
$$

## The route

| Article | Main question | Destination |
|---|---|---|
| 01 | What algebraic objects are allowed? | Rings, ideals, quotients, modules, exactness |
| 02 | Why are prime ideals the right points? | Maximal ideals, primes, localizations, supports |
| 03 | How does a ring become a topological space? | `Spec A`, Zariski closed sets, basic opens |
| 04 | What is a sheaf really measuring? | Presheaves, sheaves, stalks, local-to-global data |
| 05 | Where is the ring of functions on `Spec A`? | Structure sheaf and affine schemes |
| 06 | How do modules become geometric objects? | Associated sheaves and quasi-coherent sheaves |
| 07 | What is finiteness for sheaves? | Coherent sheaves from finite modules |
| 08 | What geometry is hidden in ring operations? | Nilpotents, components, quotients, dimension |
| 09 | How do maps of rings become maps of spaces? | Morphisms, global sections, anti-equivalence |
| 10 | What is the final ring-to-space picture? | A synthesis of the algebra-geometry dictionary |
| 11 | How does this resemble calculus? | Residue values, Taylor-like local rings, spheres, and tori |
| Appendix | Where is each Atiyah and Macdonald topic used? | Reference map |

## Notation

All rings are commutative and have a multiplicative identity unless explicitly stated otherwise. A ring homomorphism sends \\(1\\) to \\(1\\). Ideals are written \\(I,J,\mathfrak a,\mathfrak b\\); prime ideals are \\(\mathfrak p,\mathfrak q\\); maximal ideals are \\(\mathfrak m,\mathfrak n\\). For \\(f\in A\\),

$$
D(f)=\{\mathfrak p\in\operatorname{Spec}A:f\notin\mathfrak p\},
\qquad
V(I)=\{\mathfrak p\in\operatorname{Spec}A:I\subseteq\mathfrak p\}.
$$

The localization of \\(A\\) at powers of \\(f\\) is \\(A\_f\\). The localization at a prime is \\(A\_{\mathfrak p}\\). For an \\(A\\)-module \\(M\\), its localization is \\(M\_f\\) or \\(M\_{\mathfrak p}\\), and its associated sheaf on \\(\operatorname{Spec} A\\) is \\(\widetilde M\\).

## Why affine schemes are the central destination

Classical algebraic geometry starts from polynomial equations over a field. If \\(k\\) is algebraically closed, maximal ideals of \\(k[x\_1,\ldots,x\_n]\\) correspond to points of \\(k^n\\), and an ideal \\(I\\) cuts out a zero set. Scheme theory keeps that intuition but changes three things.

<div class="rt-env" markdown="1">
<span class="rt-env-title">Three upgrades</span>

1. Points are prime ideals, not only maximal ideals.
2. A space is not only a set of points; it carries a sheaf of rings.
3. Nilpotents and local rings are not defects. They encode infinitesimal and local structure.
</div>

The affine scheme attached to \\(A\\) is the locally ringed space

$$
\operatorname{Spec} A=(|\operatorname{Spec} A|,\mathcal O_{\operatorname{Spec}A}),
$$

where the underlying set consists of prime ideals, the topology is defined by the closed sets \\(V(I)\\), and the structure sheaf satisfies

$$
\mathcal O_{\operatorname{Spec}A}(D(f))=A_f.
$$

This formula is the hinge of the subject. It says that restricting functions to the open set where \\(f\\) does not vanish is algebraically the same as making \\(f\\) invertible.

## Why coherent sheaves are the second destination

If rings describe affine spaces, modules describe linear algebra over those spaces. A module \\(M\\) over \\(A\\) becomes a sheaf \\(\widetilde M\\) by

$$
\widetilde M(D(f))=M_f.
$$

When \\(A\\) is Noetherian and \\(M\\) is finitely generated, \\(\widetilde M\\) is coherent. Coherent sheaves are the algebraic-geometric replacement for finite systems of equations, vector bundles with singularities, ideal sheaves, quotient sheaves, and modules of relations. They are flexible enough to include torsion and singular support, but finite enough for kernels, cokernels, and local computations to remain controlled.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Persistent warning</span>

It is misleading to think of \\(\operatorname{Spec} A\\) as "the set of ordinary points of \\(A\\)." Closed points are only part of the space. Generic points, non-closed primes, nilpotent thickening, and local rings are precisely what make schemes a good language for arithmetic and singular geometry.
</div>

## Running examples

The same examples recur throughout the series.

| Ring | Geometric reading |
|---|---|
| \\(\mathbb Z\\) | Arithmetic line; closed points are \\((p)\\), generic point is \\((0)\\) |
| \\(\mathbb C[x]\\) | Complex affine line, with closed points \\((x-\alpha)\\) and generic point \\((0)\\) |
| \\(k[x,y]/(xy)\\) | Two coordinate axes meeting at the origin |
| \\(A\_f\\) | Functions on the basic open set \\(D(f)\\) |
| \\(A/I\\) | Closed subscheme cut out by \\(I\\) |
| A finite \\(A\\)-module \\(M\\), with \\(A\\) Noetherian | A coherent sheaf \\(\widetilde M\\) on \\(\operatorname{Spec}A\\) |

<nav class="rt-nav">
  <span></span>
  <a class="rt-next" href="/articles/rt-01-rings-ideals-modules/"><span>Next</span>Rings, Ideals, and Modules</a>
</nav>

</article>
