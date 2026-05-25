---
title: "Sheaf Cohomology 00: Roadmap"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, complex-manifolds, riemann-surfaces]
topics: coverage audit, line bundles, divisors, Cech cohomology, de Rham theorem
short: "A source map and reading order for the sheaf-cohomology series."
permalink: /articles/sheaf-cohomology/
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-00" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 00</p>

# Roadmap

<p class="sc-deck">This is the coverage audit and reading map for Part IV, "Sheaves and Cohomology on Complex Manifolds," in <em>Complex Analysis and Riemann Surfaces</em>.</p>
</header>

Part IV of the PDF begins with concrete holomorphic line bundles and divisors, then builds the language of sheaves, Cech cohomology, derived-functor sheaf cohomology, exact sequences, fine resolutions, de Rham and Dolbeault comparisons, and finally the relation among divisors, degree, curvature, and the fundamental theorem of algebra. This series follows that development but supplies the background that is usually scattered across several sources.
 
{% include sheaf_cohomology_derham_roadmap_intro.md %}


<div class="sc-env" markdown="1">
<span class="sc-env-title">Coverage audit</span>

<div class="sc-coverage-row sc-coverage-head">
  <span>PDF section</span>
  <span>Main content</span>
  <span>Articles</span>
</div>
<div class="sc-coverage-row"><span>Part IV opening, p.190</span><span>Line bundles, divisors, sheaves, cohomology, exact sequences, de Rham/Dolbeault, curvature, and degree.</span><span>00</span></div>
<div class="sc-coverage-row"><span>6.1, p.190</span><span>Holomorphic line bundles by transition functions, cocycle conditions, gauge changes, tensor products, duals, and explicit models.</span><span>01</span></div>
<div class="sc-coverage-row"><span>6.2, 6.5, pp.194, 198</span><span>Divisors, principal divisors, local orders, meromorphic sections, and the sheaf $$\mathcal O(D)$$.</span><span>02</span></div>
<div class="sc-coverage-row"><span>6.3, 6.6-6.8, pp.196-201</span><span>Picard group, classification by $$H^1(M,\mathcal O^*)$$, $$\mathcal O(n)$$ on $$\mathbb{CP}^1$$, global sections, and degree.</span><span>03</span></div>
<div class="sc-coverage-row"><span>7.1-7.2, pp.202-204</span><span>Presheaves, restriction maps, sheaf locality, and gluing.</span><span>04</span></div>
<div class="sc-coverage-row"><span>7.3-7.5, pp.205-206</span><span>Morphisms, kernels, images, exactness, stalks, germs, constant and skyscraper sheaves, examples and non-examples.</span><span>05</span></div>
<div class="sc-coverage-row"><span>8.1-8.4, pp.207-210</span><span>Cech cochains, coboundary, $$\delta^2=0$$, refinements, direct limits, degree-zero and degree-one computations.</span><span>06</span></div>
<div class="sc-coverage-row"><span>9.1-9.4, pp.213-215</span><span>Acyclic sheaves, Leray covers, sheaf cohomology via injective resolutions, comparison with Cech cohomology, fine, soft, and flabby sheaves.</span><span>07</span></div>
<div class="sc-coverage-row"><span>10.1-10.4, pp.216-218</span><span>Holomorphic logarithms, the exponential sequence, connecting homomorphisms, and line bundles from transition functions.</span><span>08</span></div>
<div class="sc-coverage-row"><span>11.1-11.3, pp.219-220</span><span>Short exact sequences of sheaves, long exact sequences in cohomology, functoriality, naturality, and examples.</span><span>09</span></div>
<div class="sc-coverage-row"><span>12.1-12.6, pp.221-228</span><span>Local exactness, Poincare lemma, partitions of unity, fine sheaves, Mayer-Vietoris, de Rham theorem via sheaves, and Dolbeault resolution.</span><span>10</span></div>
<div class="sc-coverage-row"><span>13.1-13.5, pp.229-236</span><span>Canonical bundles, complex-coordinate formulas, curvature, Ricci form, Chern classes, canonical divisors, and metric examples.</span><span>11</span></div>
<div class="sc-coverage-row"><span>14.1-14.5, pp.237-242</span><span>Divisors on compact Riemann surfaces, degree map, Picard classes, principal divisors, and the fundamental theorem of algebra.</span><span>12</span></div>
</div>

<div class="sc-aside" markdown="1">
<span class="sc-env-title">Background supplied beyond the PDF</span>

The notes expand the local-to-global mechanism behind sheaves, the Cech representative of a line bundle, the reason exactness is tested on stalks rather than only on global sections, the proof anatomy of long exact sequences, and the role of fine resolutions in computing cohomology. The differential-forms series is the natural prerequisite for Article 10; see [Differential Forms 00](/articles/differential-forms/). The divisor and canonical-bundle material also connects to [Riemann-Roch 04](/articles/rr-04-canonical-divisor/) and [Riemann-Roch 09](/articles/rr-09-cohomological-form/).
</div>

## Notation

Throughout, $$X$$ denotes a complex manifold, and most geometric examples are compact Riemann surfaces. The structure sheaf is $$\mathcal O_X$$, its sheaf of nowhere-zero holomorphic functions is $$\mathcal O_X^*$$, the sheaf of smooth real or complex functions is $$\mathcal C^\infty_X$$, and the sheaf of smooth $$k$$-forms is $$\mathcal A_X^k$$. For a divisor $$D=\sum_p n_p p$$, the associated sheaf is

$$
\mathcal O_X(D)(U)=
\{f\in \mathcal M_X(U): \operatorname{ord}_p(f)+n_p\ge 0
\text{ for every }p\in U\}.
$$

Cech cochains for an open cover $$\mathfrak U=\{U_i\}$$ are denoted

$$
C^q(\mathfrak U,\mathcal F)=\prod_{i_0<\cdots<i_q}
\mathcal F(U_{i_0}\cap\cdots\cap U_{i_q}).
$$

The symbol $$H^q(X,\mathcal F)$$ means derived-functor sheaf cohomology. For good covers and acyclic covers it agrees with the Cech cohomology computed from sufficiently refined covers.

## Reading order

Articles 01-03 treat line bundles and divisors before general sheaves appear. Articles 04-07 build sheaf language and cohomology. Articles 08-10 explain how exact sequences and fine resolutions compute geometric invariants. Articles 11-12 return to compact Riemann surfaces, where Chern class, curvature, divisors, and degree meet.

<div class="sc-grid">
  <div class="sc-card"><a href="/articles/sc-01-line-bundles-and-transition-functions/">01. Line Bundles</a><br><span class="sc-small">cocycles and gauges</span></div>
  <div class="sc-card"><a href="/articles/sc-02-divisors-and-associated-line-bundles/">02. Divisors</a><br><span class="sc-small">orders and $$\mathcal O(D)$$</span></div>
  <div class="sc-card"><a href="/articles/sc-03-picard-group-and-degree/">03. Picard Group</a><br><span class="sc-small">degree and $$\mathbb{CP}^1$$</span></div>
  <div class="sc-card"><a href="/articles/sc-04-sheaves-presheaves-and-locality/">04. Sheaves</a><br><span class="sc-small">locality and gluing</span></div>
  <div class="sc-card"><a href="/articles/sc-05-morphisms-stalks-and-exactness/">05. Stalks and Exactness</a><br><span class="sc-small">local criteria</span></div>
  <div class="sc-card"><a href="/articles/sc-06-cech-cohomology/">06. Cech Cohomology</a><br><span class="sc-small">cochains and cocycles</span></div>
  <div class="sc-card"><a href="/articles/sc-07-sheaf-cohomology-and-acyclic-resolutions/">07. Sheaf Cohomology</a><br><span class="sc-small">acyclic resolutions</span></div>
  <div class="sc-card"><a href="/articles/sc-08-exponential-sequence-and-line-bundles/">08. Exponential Sequence</a><br><span class="sc-small">Chern classes</span></div>
  <div class="sc-card"><a href="/articles/sc-09-long-exact-sequences/">09. Long Exact Sequences</a><br><span class="sc-small">connecting maps</span></div>
  <div class="sc-card"><a href="/articles/sc-10-fine-sheaves-and-de-rham/">10. de Rham and Dolbeault</a><br><span class="sc-small">fine resolutions</span></div>
  <div class="sc-card"><a href="/articles/sc-11-canonical-bundles-chern-classes-curvature/">11. Canonical Bundles</a><br><span class="sc-small">curvature and Ricci form</span></div>
  <div class="sc-card"><a href="/articles/sc-12-divisors-degree-and-fundamental-theorem/">12. Degree and FTA</a><br><span class="sc-small">compact surface divisors</span></div>
</div>

<nav class="sc-nav">
  <a class="sc-next" href="/articles/sc-01-line-bundles-and-transition-functions/"><span>Start</span>Line Bundles and Transition Functions</a>
</nav>

</article>
