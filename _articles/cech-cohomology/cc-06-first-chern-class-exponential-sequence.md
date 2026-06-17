---
title: "Čech Cohomology 06: First Chern Class and the Exponential Sequence"
layout: page
categories: Mathematics
tags: [cech-cohomology, chern-classes, exponential-sequence]
topics: first Chern class, exponential sequence, logarithms, integer cocycles
short: "The first Chern class appears when local logarithms of transition functions fail to patch."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-06" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 06</p>

# First Chern class and the exponential sequence

<p class="sc-deck">A line bundle is a multiplicative cocycle. Its first Chern class is the additive obstruction obtained by taking local logarithms.</p>
</header>

The calculus intuition is period-counting. A locally defined angle may jump by an integer multiple of $$2\pi$$ around a loop. For a line bundle, local logarithms of transition functions may jump by integers on triple overlaps. Čech cohomology records those integers.

Start with the exponential sequence

$$
0\to\mathbb Z\to\mathcal O_X
\xrightarrow{\exp(2\pi i\,\cdot)}
\mathcal O_X^*\to0.
$$

It turns multiplicative transition functions into an additive obstruction.

## Local logarithms

Let $$L$$ be represented by transition functions

$$
g_{ij}\in\mathcal O_X^*(U_{ij})
$$

with

$$
g_{ij}g_{jk}g_{ki}=1.
$$

On a cover where logarithms can be chosen locally, pick functions $$\ell_{ij}$$ satisfying

$$
\exp(2\pi i\,\ell_{ij})=g_{ij}.
$$

The multiplicative cocycle condition implies

$$
\ell_{ij}+\ell_{jk}+\ell_{ki}\in\mathbb Z
$$

on triple overlaps. Define

$$
n_{ijk}=\ell_{ij}+\ell_{jk}+\ell_{ki}.
$$

Then $$n=\{n_{ijk}\}$$ is a Čech $$2$$-cocycle for $$\mathbb Z$$.

## Why the class is well-defined

Changing a logarithm by an integer cochain changes $$n$$ by a Čech coboundary. Changing the line-bundle frames changes the original multiplicative cocycle by a coboundary, and the same construction again changes $$n$$ only by a coboundary.

Therefore the class

$$
[n_{ijk}]\in H^2(X,\mathbb Z)
$$

depends only on the line bundle. This class is $$c_1(L)$$.

<div class="sc-env" markdown="1">
<span class="sc-env-title">Computational rule</span>

To compute $$c_1$$ by Čech representatives:

1. write transition functions $$g_{ij}$$;
2. choose local logarithms $$\ell_{ij}$$;
3. add the logarithms on triple overlaps;
4. keep the resulting integer $$2$$-cocycle modulo coboundaries.
</div>

## Relation to the connecting map

The construction is exactly the connecting homomorphism

$$
H^1(X,\mathcal O_X^*)\to H^2(X,\mathbb Z)
$$

coming from the exponential sequence. The words "connecting homomorphism" mean the same practical operation as before: lift locally, apply $$\delta$$, and read the obstruction in the previous sheaf.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Period analogy</span>

For a closed $$1$$-form, local potentials differ by locally constant functions. Around a loop, the constants may accumulate to a nonzero period. For a line bundle, local logarithms differ by integer jumps. Around compatible triples, those jumps form the Chern cocycle.
</div>

<nav class="sc-nav">
  <a href="/articles/cc-05-line-bundles-transition-functions/"><span>Previous</span>Line Bundles as Transition Functions</a>
  <a class="sc-next" href="/articles/cc-07-exact-sequences-connecting-maps/"><span>Next</span>Exact Sequences and Connecting Maps</a>
</nav>

</article>
