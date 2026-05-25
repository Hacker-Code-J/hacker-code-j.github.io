---
title: "Sheaf Cohomology 08: Exponential Sequence and Line Bundles"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, exponential-sequence, chern-class]
topics: holomorphic logarithms, exponential sequence, connecting homomorphism, Chern class
short: "The exponential sequence converts logarithm obstructions into line bundle classes."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-08" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 08</p>

# Exponential sequence and line bundles

<p class="sc-deck">The exponential sequence is the exact place where holomorphic logarithms, line bundles, and integral Chern classes meet.</p>
</header>
{% include sc_bridge_08_exponential_from_forms.md %}


Chapter 10 of the PDF studies the exponential short exact sequence. It is one of the most important examples in sheaf cohomology because it translates multiplicative transition functions into additive integer obstructions.

## Local logarithms

Every nowhere-zero holomorphic function has a local holomorphic logarithm. If $$f\in\mathcal O^*(U)$$ and $$p\in U$$, choose a small simply connected neighborhood $$V$$ on which

$$
f=e^g
$$

for some $$g\in\mathcal O(V)$$. Globally this may fail because logarithms have monodromy.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: $$z$$ on $$\mathbb C^*$$</span>

The function $$z$$ has ordinary local logarithms on small sectors. Around a full loop, the logarithm changes by $$2\pi i$$. Equivalently, under the normalized map $$f\mapsto\exp(2\pi i f)$$, local preimages differ by integers after one circuit. Thus $$z$$ is locally, but not globally, in the image on $$\mathbb C^*$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: a constant unitary function</span>

The constant function $$e^{2\pi i\alpha}$$ on a connected space has an ordinary global logarithm $$2\pi i\alpha$$; under the normalized map $$f\mapsto\exp(2\pi i f)$$ below, the global preimage is $$\alpha$$. There is no monodromy because the function has no winding on the base. Local logarithm failure is not about being non-real or nonconstant; it is about topology.
</div>

## The exponential sequence

With the normalization used in complex geometry,

$$
0\to\mathbb Z
\to\mathcal O_X
\xrightarrow{\exp(2\pi i\,\cdot)}
\mathcal O_X^*
\to0
$$

is an exact sequence of sheaves. Exactness means:

1. the kernel of $$\exp(2\pi i f)$$ is locally constant integer-valued functions;
2. every invertible holomorphic function has a local logarithm.

Applying cohomology gives a long exact sequence containing

$$
\begin{aligned}
H^1(X,\mathcal O_X) &\to H^1(X,\mathcal O_X^*) \\
&\xrightarrow{c_1} H^2(X,\mathbb Z) \\
&\to H^2(X,\mathcal O_X).
\end{aligned}
$$

Since $$H^1(X,\mathcal O_X^*)=\operatorname{Pic}(X)$$, the connecting homomorphism is the first Chern class.

## Cech description of the connecting map

Let a line bundle be represented by transition functions $$g_{ij}$$. Choose local logarithms

$$
g_{ij}=\exp(2\pi i f_{ij})
$$

on overlaps. On triple overlaps, the cocycle condition gives

$$
g_{ij}g_{jk}g_{ki}=1,
$$

so

$$
f_{ij}+f_{jk}+f_{ki}=n_{ijk}\in\mathbb Z.
$$

The integers $$n_{ijk}$$ form a Cech 2-cocycle representing $$c_1(L)$$.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: $$\mathcal O(1)$$ on $$\mathbb{CP}^1$$</span>

For $$\mathcal O(1)$$, choose the Cech representative with positive winding, written $$z$$ on the equatorial overlap; the reciprocal appears if the cover order or frame convention is reversed. To see the Chern class, refine the overlap into simply connected sectors and choose branches of $$\log z$$. Passing around the equator changes the branch by $$2\pi i$$. The resulting integer cocycle has total value $$1$$, so

$$
c_1(\mathcal O(1))=1.
$$
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: powers and tensor products</span>

For $$\mathcal O(n)$$, the positive-winding representative is $$z^n$$. Local logarithms are $$n\log z$$, so the monodromy integer is multiplied by $$n$$. Therefore

$$
\begin{aligned}
c_1(\mathcal O(n))&=n,
\\
c_1(L\otimes M)&=c_1(L)+c_1(M).
\end{aligned}
$$
</div>

## What the sequence proves

The exponential sequence distinguishes three layers:

$$
H^1(X,\mathcal O_X)
\quad\text{analytic additive data},
$$

$$
H^1(X,\mathcal O_X^*)=\operatorname{Pic}(X).
$$
This is the group of holomorphic line bundles.

$$
H^2(X,\mathbb Z)
\quad\text{topological Chern class}.
$$

Line bundles with the same Chern class may still differ holomorphically; their difference lies in the image of $$H^1(X,\mathcal O_X)$$.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 5: elliptic curve degree zero</span>

For an elliptic curve $$E$$, degree-zero line bundles have $$c_1=0$$ but need not be holomorphically trivial. They form $$\operatorname{Pic}^0(E)$$. The exponential sequence explains how such bundles can be topologically trivial while remaining analytically distinct.
</div>

<nav class="sc-nav">
  <a href="/articles/sc-07-sheaf-cohomology-and-acyclic-resolutions/"><span>Previous</span>Sheaf Cohomology</a>
  <a class="sc-next" href="/articles/sc-09-long-exact-sequences/"><span>Next</span>Long Exact Sequences</a>
</nav>

</article>
