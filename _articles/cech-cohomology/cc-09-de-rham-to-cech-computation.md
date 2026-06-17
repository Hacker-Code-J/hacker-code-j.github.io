---
title: "Čech Cohomology 09: De Rham to Čech Computation"
layout: page
categories: Mathematics
tags: [cech-cohomology, de-rham-cohomology, computations]
topics: local potentials, periods, good covers, grad curl div
short: "Closed forms become Čech cocycles by choosing local potentials and comparing them on overlaps."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-09" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 09</p>

# De Rham to Čech computation

<p class="sc-deck">To convert de Rham data into Čech data, choose local potentials and record their overlap differences.</p>
</header>

This article returns to the starting intuition and turns it into a concrete calculation. A closed form gives local solutions. The Čech cocycle records the failure of those local solutions to patch.

## Closed one-forms

Let $$\alpha$$ be a closed $$1$$-form. Choose a good cover $$\{U_i\}$$. By local exactness, pick functions $$f_i$$ with

$$
\alpha=df_i
$$

on each $$U_i$$. On overlaps,

$$
d(f_j-f_i)=0.
$$

Therefore

$$
c_{ij}=f_j-f_i
$$

is locally constant. The family $$c=\{c_{ij}\}$$ is a Čech $$1$$-cocycle for the constant sheaf.

## Exactness as a coboundary test

If constants $$b_i$$ exist with

$$
c_{ij}=b_j-b_i,
$$

then the corrected local potentials $$f_i-b_i$$ glue to a global function $$f$$ with $$df=\alpha$$. If no such constants exist, $$\alpha$$ is closed but not exact, and $$[c_{ij}]$$ is the Čech representative of the obstruction.

<div class="sc-env" markdown="1">
<span class="sc-env-title">Vector calculus translation</span>

For $$H^1$$, read this as:

$$
\nabla\times F=0
\quad\Rightarrow\quad
F=\nabla f_i\text{ locally}.
$$

The failure of the scalar potentials $$f_i$$ to patch is the same obstruction detected by integrating $$F$$ around closed loops.
</div>

## Closed two-forms and divergence-free fields

In three-dimensional vector calculus, a closed $$2$$-form corresponds to a divergence-free field $$B$$. Locally one may write

$$
B=\nabla\times A_i.
$$

On overlaps,

$$
\nabla\times(A_j-A_i)=0,
$$

so $$A_j-A_i$$ is locally a gradient. The next layer of local scalar potentials produces higher overlap data. The same ladder appears again: local solve, overlap difference, obstruction.

## Practical workflow

To compute a de Rham class by Čech data:

1. choose a cover where local primitives are easy;
2. solve the differential equation locally;
3. subtract local solutions on overlaps;
4. check the Čech cocycle condition;
5. quotient by changes of local primitives;
6. interpret the surviving class as periods, flux, or a sheaf-cohomology class.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Punctured-plane pattern</span>

The angular form is locally the differential of an angle function. Different branches of the angle differ by constants on overlaps. Going around the puncture changes the branch by a period. Čech records the constant jumps.
</div>

<nav class="sc-nav">
  <a href="/articles/cc-08-laurent-computations-cp1/"><span>Previous</span>Laurent Computations on CP1</a>
  <a class="sc-next" href="/articles/cc-10-computation-checklist/"><span>Next</span>Computation Checklist</a>
</nav>

</article>
