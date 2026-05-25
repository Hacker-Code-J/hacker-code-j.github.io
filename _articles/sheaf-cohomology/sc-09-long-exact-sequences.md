---
title: "Sheaf Cohomology 09: Long Exact Sequences"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, exact-sequences, connecting-homomorphism]
topics: short exact sequences, long exact cohomology sequence, connecting maps, naturality
short: "How a local short exact sequence produces global obstruction maps."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-09" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 09</p>

# Long exact sequences

<p class="sc-deck">A short exact sequence of sheaves is local; its long exact cohomology sequence records the global cost of lifting sections.</p>
</header>
{% include sc_bridge_09_exact_sequences_from_boundaries.md %}


Chapter 11 of the PDF develops the long exact sequence in cohomology. This is the main computational tool of sheaf cohomology: once a sheaf is related to simpler sheaves, its cohomology can often be read from the exact sequence.

## The theorem

Given a short exact sequence of sheaves

$$
0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0,
$$

there is a natural long exact sequence

$$
\begin{aligned}
0&\to H^0(X,\mathcal F')\to H^0(X,\mathcal F)\to H^0(X,\mathcal F'')\\
&\xrightarrow{\delta}H^1(X,\mathcal F')\to H^1(X,\mathcal F)\to H^1(X,\mathcal F'')\\
&\xrightarrow{\delta}H^2(X,\mathcal F')\to\cdots .
\end{aligned}
$$

The connecting homomorphism $$\delta$$ sends an object that is locally liftable to the obstruction to lifting it globally.

## Cech construction of the connecting map

Let $$s''\in H^0(X,\mathcal F'')$$. Choose a cover $$\{U_i\}$$ and local lifts $$s_i\in\mathcal F(U_i)$$. On overlaps,

$$
s_j-s_i
$$

maps to zero in $$\mathcal F^{\prime\prime}$$, so it comes from a section $$a_{ij}\in\mathcal F^{\prime}(U_i\cap U_j)$$. The family $$a_{ij}$$ is a Cech 1-cocycle. Its class is

$$
\delta(s'')\in H^1(X,\mathcal F').
$$

Changing the local lifts changes $$a_{ij}$$ by a coboundary, so the cohomology class is well-defined.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: exponential sequence</span>

For

$$
0\to\mathbb Z\to\mathcal O_X\to\mathcal O_X^*\to0,
$$

the connecting map sends a nowhere-zero holomorphic function to its logarithm monodromy, and sends a line bundle class to its first Chern class one degree later. The obstruction to choosing logarithms globally becomes an integral cohomology class.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: evaluating at a divisor</span>

For a line bundle $$L$$ and an effective divisor $$D$$ there is an exact sequence

$$
0\to L(-D)\to L\to L|_D\to0.
$$

The connecting map

$$
H^0(D,L|_D)\to H^1(X,L(-D))
$$

measures whether prescribed jets along $$D$$ extend to global sections of $$L$$. This is the cohomological form of interpolation with constraints.
</div>

## Naturality

A morphism between short exact sequences induces a morphism between their long exact cohomology sequences, and the squares commute. This matters because many computations compare an unknown sheaf with a model sheaf by restriction, tensoring, or pullback. The connecting maps are compatible with those comparisons.

<div class="sc-proof" markdown="1">
<span class="sc-env-title">Proof sketch</span>

Using injective resolutions, sheaf cohomology is a derived functor, and derived functors of a left exact functor produce long exact sequences from short exact sequences. In the Cech model, the construction above gives the connecting map explicitly; exactness follows by checking that a cocycle vanishes precisely when the preceding lifting problem can be solved.
</div>

## Mayer-Vietoris as an exact sequence

If $$X=U\cup V$$ and $$\mathcal F$$ is computed by an acyclic resolution $$\mathcal A^\bullet$$ whose restriction-difference maps are surjective, then one has a short exact sequence of complexes

$$
0\to \mathcal A^\bullet(X)\to
\mathcal A^\bullet(U)\oplus\mathcal A^\bullet(V)
\to\mathcal A^\bullet(U\cap V)\to0.
$$

For smooth forms, and more generally for fine resolutions used in differential geometry, this surjectivity comes from partitions of unity. The associated long exact sequence is the Mayer-Vietoris sequence.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: computing $$H^1(S^1,\mathbb R)$$</span>

Cover $$S^1$$ by two arcs $$U,V$$ with two overlap components. Since arcs are contractible, their first cohomology vanishes. The Mayer-Vietoris boundary identifies the one-dimensional difference between the two overlap components, giving

$$
H^1(S^1,\mathbb R)\cong\mathbb R.
$$
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: vanishing on $$\mathbb{CP}^1$$ from a divisor sequence</span>

The sequence

$$
0\to\mathcal O(n-1)\to\mathcal O(n)\to\mathcal O(n)|_p\to0
$$

relates sections of consecutive line bundles. Starting from $$H^1(\mathbb{CP}^1,\mathcal O(-1))=0$$ and using induction, one obtains the familiar dimensions of $$H^0(\mathcal O(n))$$ for $$n\ge0$$.
</div>

## Exactness as a diagnostic

When a computation seems wrong, locate the term that should be the kernel of the next map and the image of the previous map. The long exact sequence is not only a theorem; it is a consistency check for dimensions, maps, and obstruction classes.

<nav class="sc-nav">
  <a href="/articles/sc-08-exponential-sequence-and-line-bundles/"><span>Previous</span>Exponential Sequence</a>
  <a class="sc-next" href="/articles/sc-10-fine-sheaves-and-de-rham/"><span>Next</span>Fine Sheaves and de Rham</a>
</nav>

</article>
