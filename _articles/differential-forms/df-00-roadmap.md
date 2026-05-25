---
title: "Differential Forms 00: Roadmap to Stokes"
layout: page
categories: Mathematics
tags: [differential-forms, stokes-theorem, riemann-surfaces]
topics: coverage audit, source map, notation, reading order
short: "A source map for the differential-forms series."
permalink: /articles/differential-forms/
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-00" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 00</p>

# Roadmap to Stokes

<p class="df-deck">This is the coverage audit and reading map for Part III, "Differential Forms and the Generalized Stokes Theorem," in <em>Complex Analysis and Riemann Surfaces</em>.</p>
</header>

Part III of the PDF has two roles. Chapter 4 builds the computational language of differential forms: alternating covectors, coordinate forms, wedge products, exterior derivatives, line integrals, complex line integrals, Stokes/Green, Cauchy-Green, area forms, curvature, and Gauss-Bonnet. Chapter 5 uses the same integration-by-parts technology in a compact Riemann surface setting to prove a Hodge-Weyl existence theorem for the Poisson equation. This series follows that order but supplies background that the PDF can afford to compress.
{% include df_series_calculus_bridge.md %}


<div class="df-env" markdown="1">
<span class="df-env-title">Coverage audit</span>

<div class="df-coverage-row df-coverage-head">
  <span>PDF section</span>
  <span>Main content</span>
  <span>Articles</span>
</div>
<div class="df-coverage-row"><span>Part III opening</span><span>Forms as the common language for line integrals, Stokes, complex integration, area, curvature, and Hodge-Weyl.</span><span>00</span></div>
<div class="df-coverage-row"><span>4.1, p.154</span><span>Tangent spaces, alternating covectors, smooth forms, coordinate 1-forms, wedge products, exterior derivative, graded Leibniz rule, and $$d^2=0$$.</span><span>01, 02, 03, 09</span></div>
<div class="df-coverage-row"><span>4.2, p.161</span><span>Line integrals, conservative fields, exact forms, closed forms, and closed non-exact forms on punctured domains.</span><span>04, 09</span></div>
<div class="df-coverage-row"><span>4.3, p.167</span><span>Complex coordinates, $$dz,d\bar z$$, real 1-forms in complex basis, winding number, residues, and $$\operatorname{Im}(dz/z)$$.</span><span>05, 09</span></div>
<div class="df-coverage-row"><span>4.4, p.172</span><span>Green/Stokes in form language, Cauchy-Green formula, area 2-forms, Jacobians, and reparametrization invariance.</span><span>06, 09</span></div>
<div class="df-coverage-row"><span>4.5, p.180</span><span>Area form, Gaussian curvature, unit sphere, torus of revolution, and Gauss-Bonnet.</span><span>07</span></div>
<div class="df-coverage-row"><span>5.1-5.2, p.184</span><span>Hermitian area form, $$L^2$$ and $$W^{1,2}$$ norms, weak formulation, mean-zero condition.</span><span>08</span></div>
<div class="df-coverage-row"><span>5.3-5.6, pp.185-187</span><span>Poincare inequality, coercivity, Lax-Milgram, Weyl regularity, elliptic regularity, Hodge-Weyl theorem.</span><span>08</span></div>
<div class="df-coverage-row"><span>5.7-5.9, pp.187-189</span><span>Explicit models on $$S^1$$, the flat torus, and the round sphere; exercises and variational viewpoint.</span><span>08, 09</span></div>
</div>

<div class="df-aside" markdown="1">
<span class="df-env-title">Background added beyond the PDF</span>

The articles expand four points that are easy to underestimate: tangent vectors as derivations, the determinant meaning of wedge products, the distinction between closed and exact forms on non-simply-connected domains, and the functional-analytic mechanism behind Hodge-Weyl. Existing Riemann-Roch notes become relevant when holomorphic differentials, canonical divisors, and Serre duality enter later; see [Riemann-Roch 04](/articles/rr-04-canonical-divisor/) and [Riemann-Roch 09](/articles/rr-09-cohomological-form/).
</div>

## Notation

For an open set $$U\subset \mathbb R^n$$, $$\Omega^k(U)$$ denotes the smooth $$k$$-forms on $$U$$. Coordinate vector fields are $$\partial_i=\partial/\partial x_i$$ and coordinate 1-forms are $$dx_i$$. If $$I=(i_1<\cdots<i_k)$$, write

$$
dx_I=dx_{i_1}\wedge\cdots\wedge dx_{i_k}.
$$

On $$\mathbb C$$, write $$z=x+iy$$,

$$
dz=dx+i\,dy,\qquad d\bar z=dx-i\,dy,\qquad
dx\wedge dy={1\over 2i}\,d\bar z\wedge dz.
$$

For a Riemannian or Hermitian surface, $$dA$$ or $$\omega$$ denotes the area form. The Laplacian sign convention in Article 08 is the nonnegative convention on compact examples unless explicitly stated.

## Reading order

The first three articles give the algebra and calculus. Articles 04-06 turn that algebra into integration. Article 07 treats curvature and Gauss-Bonnet. Article 08 treats the analytic Hodge-Weyl theorem. Article 09 is a computation manual for common errors.

<div class="df-grid">
  <div class="df-card"><a href="/articles/df-01-tangent-cotangent-and-forms/">01. Tangent, Cotangent, Forms</a><br><span class="df-small">derivations and covectors</span></div>
  <div class="df-card"><a href="/articles/df-02-wedge-product-and-exterior-algebra/">02. Wedge Product</a><br><span class="df-small">signs and determinants</span></div>
  <div class="df-card"><a href="/articles/df-03-exterior-derivative/">03. Exterior Derivative</a><br><span class="df-small">Leibniz and $$d^2=0$$</span></div>
  <div class="df-card"><a href="/articles/df-04-line-integrals-and-conservative-fields/">04. Line Integrals</a><br><span class="df-small">exact versus closed</span></div>
  <div class="df-card"><a href="/articles/df-05-complex-line-integrals/">05. Complex Line Integrals</a><br><span class="df-small">$$dz$$, residues, winding</span></div>
  <div class="df-card"><a href="/articles/df-06-stokes-cauchy-green-and-area-forms/">06. Stokes and Cauchy-Green</a><br><span class="df-small">boundary to area</span></div>
  <div class="df-card"><a href="/articles/df-07-gauss-bonnet-and-curvature-forms/">07. Gauss-Bonnet</a><br><span class="df-small">curvature as a 2-form</span></div>
  <div class="df-card"><a href="/articles/df-08-hodge-weyl-on-riemann-surfaces/">08. Hodge-Weyl</a><br><span class="df-small">weak existence and regularity</span></div>
  <div class="df-card"><a href="/articles/df-09-worked-computations-and-pitfalls/">09. Computations</a><br><span class="df-small">signs, pullbacks, Stokes checks</span></div>
</div>

<nav class="df-nav">
  <a class="df-next" href="/articles/df-01-tangent-cotangent-and-forms/"><span>Start</span>Tangent, Cotangent, Forms</a>
</nav>

</article>
