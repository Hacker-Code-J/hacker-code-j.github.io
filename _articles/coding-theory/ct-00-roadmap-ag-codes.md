---
title: "Coding Theory 00: Roadmap to AG Codes"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: roadmap, coverage audit, notation, dependencies
short: "A coverage map for the algebraic-geometric coding theory companion series."
permalink: /articles/coding-theory/
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-00" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 00</p>

# Roadmap to AG Codes

<p class="ct-deck">This article is the coverage audit and reading map for the companion series to <em>Algebraic geometric codes on curves and surfaces</em>.</p>
</header>

The source text has a compact structure: elementary coding theory, algebraic-geometric codes on curves, decoding algorithms, scheme-theoretic preparation for higher-dimensional varieties, surface codes, and ruled surface codes. The purpose of this reorganized collection is to make that path readable as a sequence of lecture notes. The articles are a companion designed to supply the missing connective tissue, computations, notation, and examples.

<div class="ct-env ct-coverage">
<span class="ct-env-title">Source coverage audit</span>

<div class="ct-coverage-row ct-coverage-head">
  <span>PDF part</span>
  <span>Main mathematical content</span>
  <span>Companion articles</span>
</div>
<div class="ct-coverage-row"><span>Introduction</span><span>Goppa idea, TVZ improvement, passage from curves to surfaces</span><span>00, 06, 18</span></div>
<div class="ct-coverage-row"><span>Chapter 1</span><span>Basic codes, Singleton/Hamming/Gilbert bounds, Shannon motivation, duality, syndrome decoding; Plotkin added as standard high-distance context</span><span>01, 02</span></div>
<div class="ct-coverage-row"><span>Chapter 2.1</span><span>Evaluation AG codes on curves and Riemann-Roch parameter bounds</span><span>03, 04</span></div>
<div class="ct-coverage-row"><span>Chapter 2.2</span><span>Dual AG codes, residues, canonical divisors, duality theorem</span><span>05</span></div>
<div class="ct-coverage-row"><span>Chapter 2.3</span><span>Rational points, Hasse-Weil, Ihara function, TVZ bound</span><span>06</span></div>
<div class="ct-coverage-row"><span>Chapter 3.1</span><span>Skorobogatov-Vladut algorithm</span><span>07</span></div>
<div class="ct-coverage-row"><span>Chapter 3.2, 3.4, 3.5</span><span>Cubic curve and Klein quartic computations</span><span>09</span></div>
<div class="ct-coverage-row"><span>Chapter 3.3</span><span>Duursma majority voting algorithm</span><span>08</span></div>
<div class="ct-coverage-row"><span>Chapter 4.1</span><span>Sheaves, locally free sheaves, coherent sheaves, twists</span><span>10</span></div>
<div class="ct-coverage-row"><span>Chapter 4.2</span><span>Divisors on varieties, Picard group, line bundles</span><span>11</span></div>
<div class="ct-coverage-row"><span>Chapter 4.3</span><span>Germ-map codes on varieties</span><span>11</span></div>
<div class="ct-coverage-row"><span>Chapter 5.1-5.3</span><span>Ample divisors, genus, cohomology, intersections, surface Riemann-Roch</span><span>12</span></div>
<div class="ct-coverage-row"><span>Chapter 5.4</span><span>Parameter bounds for surface codes, Hansen and Zarzar-Voloch context</span><span>13</span></div>
<div class="ct-coverage-row"><span>Chapter 6.1-6.3</span><span>Projective bundles, ruled surface geometry, general ruled-surface parameters</span><span>14, 15</span></div>
<div class="ct-coverage-row"><span>Chapter 6.4-6.6</span><span>Rational ruled surfaces and dimension computations</span><span>15, 16</span></div>
<div class="ct-coverage-row"><span>Chapter 6.7</span><span>Ruled surfaces over elliptic curves, Atiyah classification, degree 0 and 1 cases</span><span>17</span></div>
<div class="ct-coverage-row"><span>Chapter 6.8</span><span>Open problems and research directions</span><span>18</span></div>
</div>

<div class="ct-aside" markdown="1">
<span class="ct-env-title">Notation used throughout</span>

The finite field is $$\mathbb F_q$$. A linear code has parameters $$[n,k,d]_q$$. A curve is smooth, projective, geometrically integral, and defined over $$\mathbb F_q$$ unless explicitly stated otherwise. For a divisor $$G$$ on a curve, $$L(G)=\{f:(f)+G\ge0\}\cup\{0\}$$. Evaluation codes are denoted $$C_L(D,G)$$ and differential codes $$C_\Omega(D,G)$$, with $$D=P_1+\cdots+P_n$$ disjoint from $$G$$.
</div>

## Reading order

The first two articles reconstruct Chapter 1. The finite-field and polynomial-code bridge is made explicit through the Singleton-tight polynomial example, the syndrome examples over finite fields, and the Reed-Solomon realization on $$\mathbb P^1$$ before the general curve construction. Articles 03-06 give the curve theory of Chapter 2. Articles 07-09 separate the decoding chapter into locators, majority voting, and worked examples. Articles 10-11 supply the scheme and sheaf language used in Chapter 4. Articles 12-13 cover surfaces. Articles 14-17 cover ruled surfaces. Article 18 records the open problems and the research map.

<div class="ct-grid ct-roadmap-grid">
  <div class="ct-card"><a href="/articles/ct-01-coding-theory-foundations/">01. Coding Theory Foundations</a><br><span class="ct-small">metrics, bounds, asymptotics</span></div>
  <div class="ct-card"><a href="/articles/ct-02-linear-codes-duality-syndromes/">02. Linear Codes and Syndromes</a><br><span class="ct-small">duality and decoding</span></div>
  <div class="ct-card"><a href="/articles/ct-03-curves-divisors-riemann-roch/">03. Curves and Riemann-Roch</a><br><span class="ct-small">divisors and spaces</span></div>
  <div class="ct-card"><a href="/articles/ct-04-ag-evaluation-codes-on-curves/">04. AG Evaluation Codes</a><br><span class="ct-small">dimension and distance</span></div>
  <div class="ct-card"><a href="/articles/ct-05-dual-ag-codes-and-residues/">05. Residue Codes</a><br><span class="ct-small">differentials and duality</span></div>
  <div class="ct-card"><a href="/articles/ct-06-rational-points-and-asymptotic-bounds/">06. Rational Points and TVZ</a><br><span class="ct-small">asymptotic curve codes</span></div>
  <div class="ct-card"><a href="/articles/ct-07-sv-decoding-algorithm/">07. SV Algorithm</a><br><span class="ct-small">error locators</span></div>
  <div class="ct-card"><a href="/articles/ct-08-duursma-majority-voting/">08. Duursma Voting</a><br><span class="ct-small">syndrome completion</span></div>
  <div class="ct-card"><a href="/articles/ct-09-cubic-and-klein-decoding-examples/">09. Worked Decoding</a><br><span class="ct-small">cubic and Klein quartic</span></div>
  <div class="ct-card"><a href="/articles/ct-10-sheaves-line-bundles-and-twists/">10. Sheaves and Twists</a><br><span class="ct-small">Chapter 4 language</span></div>
  <div class="ct-card"><a href="/articles/ct-11-divisors-picard-and-variety-codes/">11. Divisors and Variety Codes</a><br><span class="ct-small">germ maps</span></div>
  <div class="ct-card"><a href="/articles/ct-12-surface-geometry-for-codes/">12. Surface Geometry</a><br><span class="ct-small">intersection and RR</span></div>
  <div class="ct-card"><a href="/articles/ct-13-parameters-of-codes-on-surfaces/">13. Surface Parameters</a><br><span class="ct-small">Hansen bounds</span></div>
  <div class="ct-card"><a href="/articles/ct-14-ruled-surfaces-geometry/">14. Ruled Geometry</a><br><span class="ct-small">projective bundles</span></div>
  <div class="ct-card"><a href="/articles/ct-15-ruled-surface-code-parameters/">15. Ruled Parameters</a><br><span class="ct-small">rational ruled surfaces</span></div>
  <div class="ct-card"><a href="/articles/ct-16-dimensions-on-ruled-surfaces/">16. Ruled Dimensions</a><br><span class="ct-small">symmetric powers</span></div>
  <div class="ct-card"><a href="/articles/ct-17-elliptic-ruled-surface-codes/">17. Elliptic Ruled Codes</a><br><span class="ct-small">Atiyah and Lomont</span></div>
  <div class="ct-card"><a href="/articles/ct-18-open-problems-and-research-map/">18. Open Problems</a><br><span class="ct-small">research map</span></div>
</div>

<nav class="ct-nav">
  <a class="ct-next" href="/articles/ct-01-coding-theory-foundations/"><span>Start</span>Coding Theory Foundations</a>
</nav>

</article>
