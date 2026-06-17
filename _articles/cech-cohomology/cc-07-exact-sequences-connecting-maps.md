---
title: "Čech Cohomology 07: Exact Sequences and Connecting Maps"
layout: page
categories: Mathematics
tags: [cech-cohomology, exact-sequences, connecting-maps]
topics: short exact sequences, local lifts, boundary maps, obstructions
short: "Connecting homomorphisms are computed by lifting locally and applying the Čech coboundary."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-07" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 07</p>

# Exact sequences and connecting maps

<p class="sc-deck">Exact sequences turn one sheaf-cohomology calculation into another. Čech cochains make the connecting map concrete.</p>
</header>

The recurring obstruction pattern is now familiar: solve locally, compare on overlaps, and keep what cannot be patched away. A connecting homomorphism is the same pattern one degree higher.

Let

$$
0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0
$$

be a short exact sequence of sheaves. A section of $$\mathcal F''$$ may lift locally to $$\mathcal F$$ even when it does not lift globally.

## The Čech recipe

Start with a Čech cocycle

$$
c\in C^q(\mathfrak U,\mathcal F'')
$$

representing a class in $$H^q(X,\mathcal F'')$$. Choose local lifts

$$
\tilde c\in C^q(\mathfrak U,\mathcal F).
$$

Because $$c$$ is a cocycle, $$\delta c=0$$. Applying $$\delta$$ to the lift gives

$$
\delta\tilde c\in C^{q+1}(\mathfrak U,\mathcal F).
$$

Its image in $$\mathcal F''$$ is zero, so it actually lies in $$\mathcal F'$$:

$$
\delta\tilde c\in C^{q+1}(\mathfrak U,\mathcal F').
$$

The class

$$
[\delta\tilde c]\in H^{q+1}(X,\mathcal F')
$$

is the connecting image of $$[c]$$.

<div class="sc-env" markdown="1">
<span class="sc-env-title">Memory hook</span>

The connecting map is not mysterious:

1. lift locally;
2. apply $$\delta$$;
3. the failure to remain compatible lands in the previous sheaf;
4. take its cohomology class.
</div>

## Degree-zero version

For a global section of $$\mathcal F''$$, choose local lifts $$s_i\in\mathcal F(U_i)$$. On overlaps,

$$
s_j-s_i
$$

maps to zero in $$\mathcal F''$$, so it is a section of $$\mathcal F'$$. The family $$\{s_j-s_i\}$$ is a Čech $$1$$-cocycle. It vanishes in cohomology exactly when the local lifts can be corrected to one global lift.

## Why this is computational

Many sheaf-cohomology computations are hard directly but easy through a sequence. Divisor sequences, quotient sheaves, logarithm sequences, and restriction sequences all ask the same practical question: can local lifts be chosen compatibly?

This article provides the operation; the next articles show it in two common settings: Laurent splitting on $$\mathbb{CP}^1$$ and de Rham data converted into Čech cocycles.

<nav class="sc-nav">
  <a href="/articles/cc-06-first-chern-class-exponential-sequence/"><span>Previous</span>First Chern Class</a>
  <a class="sc-next" href="/articles/cc-08-laurent-computations-cp1/"><span>Next</span>Laurent Computations on CP1</a>
</nav>

</article>
