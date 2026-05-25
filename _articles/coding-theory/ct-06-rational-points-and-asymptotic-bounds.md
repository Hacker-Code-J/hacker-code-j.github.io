---
title: "Coding Theory 06: Rational Points and Asymptotic Bounds"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: Hasse-Weil, Ihara, TVZ, Gilbert-Varshamov
short: "Why rational points on curves improve asymptotic coding bounds."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-06" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 06</p>

# Rational points and asymptotic bounds

<p class="ct-deck">Algebraic-geometric codes improve asymptotic bounds only when curves have many rational points relative to genus.</p>
</header>

For a smooth projective curve $$X/\mathbb F_q$$ of genus $$g$$, the Hasse-Weil bound says

$$
\left|\#X(\mathbb F_q)-(q+1)\right|\le2g\sqrt q.
$$

AG codes need rational points for evaluation. Riemann-Roch controls dimension through genus, so the decisive ratio is rational points per genus.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: genus zero is limited by field size</span>

The projective line has $$q+1$$ rational points and genus $$0$$. It gives Reed-Solomon codes, but the length cannot exceed $$q+1$$. This is excellent for large alphabets and restrictive for fixed alphabet asymptotics.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: elliptic curves add length but introduce genus cost</span>

An elliptic curve over $$\mathbb F_q$$ has about $$q+1$$ rational points, within $$2\sqrt q$$. Its genus is $$1$$, so one loses one dimension in the Riemann-Roch count compared with the line. For isolated codes this is manageable; for asymptotics one needs towers with many points per genus.
</div>

## The Ihara viewpoint

Let $$N_q(g)$$ be the maximum number of rational points on a genus $$g$$ curve over $$\mathbb F_q$$. The Ihara constant is

$$
A(q)=\limsup_{g\to\infty}{N_q(g)\over g}.
$$

If one has curves with $$N_i/g_i$$ bounded below by $$A$$, AG codes give asymptotic rates satisfying a line of the form

$$
R\ge 1-\delta-{1\over A}.
$$

For square $$q$$, the Drinfeld-Vladut bound is attained by suitable towers, with $$A(q)=\sqrt q-1$$. This yields the Tsfasman-Vladut-Zink line

$$
R\ge1-\delta-{1\over \sqrt q-1}.
$$

This improves Gilbert-Varshamov for sufficiently large square fields, in particular from the usual threshold around $$q\ge49$$.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: why square fields appear</span>

For $$q=49$$, the TVZ correction term is $$1/(7-1)=1/6$$. The line $$R=1-\delta-1/6$$ can cross above the Gilbert-Varshamov curve for some $$\delta$$. For nonsquare fields the equality $$A(q)=\sqrt q-1$$ is not available in this form; for smaller square fields the TVZ line exists but does not beat Gilbert-Varshamov.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: choosing degree from desired distance</span>

For a curve with $$n$$ rational points and divisor degree $$m$$, the AG bound gives relative distance roughly $$\delta\ge1-m/n$$ and rate roughly $$R\ge(m+1-g)/n$$. Eliminating $$m$$ gives $$R+\delta\gtrsim1-g/n$$. Large $$n/g$$ is exactly what improves the line.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-05-dual-ag-codes-and-residues/"><span>Previous</span>Dual AG Codes</a>
  <a class="ct-next" href="/articles/ct-07-sv-decoding-algorithm/"><span>Next</span>SV Decoding</a>
</nav>

</article>
