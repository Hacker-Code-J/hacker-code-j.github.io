---
title: "Čech Cohomology 03: Degree Zero and Degree One"
layout: page
categories: Mathematics
tags: [cech-cohomology, gluing, cocycles]
topics: H0, H1, gluing, patching, obstructions
short: "Degree zero glues sections; degree one measures failed patching."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-03" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 03</p>

# Degree zero and degree one

<p class="sc-deck">The first two degrees contain the main local-to-global mechanism: sections glue in degree zero, and overlap errors survive in degree one, just as local potentials may fail to become one global potential.</p>
</header>

## Degree zero: compatible local sections

A $$0$$-cochain is a family

$$
s_i\in\mathcal F(U_i).
$$

It is a cocycle when

$$
s_i|_{U_{ij}}=s_j|_{U_{ij}}
$$

for every overlap. This is exactly the sheaf gluing condition. Hence

$$
\check H^0(\mathfrak U,\mathcal F)\cong\mathcal F(X).
$$

This identity is the first sanity check in every computation. If your degree-zero answer is not the global sections, the cover, restrictions, or signs have been misread.

## Degree one: overlap errors

A $$1$$-cochain is a family

$$
a_{ij}\in\mathcal F(U_{ij}).
$$

It is a cocycle when, on triple overlaps,

$$
a_{jk}-a_{ik}+a_{ij}=0.
$$

It is a coboundary if there are local sections $$b_i\in\mathcal F(U_i)$$ such that

$$
a_{ij}=b_j-b_i.
$$

Thus $$\check H^1$$ measures overlap data that are locally consistent but cannot be expressed as differences of local corrections.

<div class="sc-env" markdown="1">
<span class="sc-env-title">Patching interpretation</span>

Suppose local objects are already chosen on each $$U_i$$, but they disagree on overlaps by $$a_{ij}$$. If $$a_{ij}=b_j-b_i$$, changing the local choices by $$b_i$$ removes the disagreement. If not, the class $$[a_{ij}]$$ is the obstruction.
</div>

## Local potentials and closed forms

This is exactly the local-potential story from de Rham cohomology. Let $$\alpha$$ be a closed $$1$$-form. On small enough open sets, the Poincare lemma gives functions $$f_i$$ with

$$
\alpha=df_i.
$$

On overlaps,

$$
d(f_j-f_i)=df_j-df_i=\alpha-\alpha=0.
$$

Thus $$f_j-f_i$$ is locally constant. The constants

$$
c_{ij}=f_j-f_i
$$

form a Čech $$1$$-cocycle for the constant sheaf. Replacing $$f_i$$ by $$f_i+b_i$$ changes $$c_{ij}$$ by the coboundary $$b_j-b_i$$. Therefore the de Rham class of $$\alpha$$ is seen in Čech language as the obstruction to patching local potentials.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Curl-free but not a global gradient</span>

In vector calculus language, a curl-free field is locally a gradient. Around a puncture or hole, local scalar potentials may differ by constants after going around the loop. The surviving Čech $$1$$-class is the same obstruction detected by integrating the field around a closed loop.
</div>

## Two-set covers

When $$X=U\cup V$$, there are no triple intersections in an ordered two-set cover. Therefore every $$1$$-cochain is automatically a cocycle. The only question is whether it is a coboundary.

For a sheaf $$\mathcal F$$,

$$
\check H^1(\{U,V\},\mathcal F)
=
\frac{\mathcal F(U\cap V)}
{\{s_V|_{U\cap V}-s_U|_{U\cap V}\}}.
$$

This formula is often the quickest way to compute examples.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Constant sheaf on a circle</span>

Cover $$S^1$$ by two arcs $$U,V$$ whose intersection has two connected components $$W_1\sqcup W_2$$. For the constant sheaf $$\underline{\mathbb Z}$$,

$$
C^1\cong\mathbb Z\oplus\mathbb Z.
$$

Coboundaries are diagonal pairs $$(n,n)$$, because a locally constant section on each arc restricts to the same integer on both components. Therefore

$$
\check H^1(S^1,\underline{\mathbb Z})\cong
(\mathbb Z\oplus\mathbb Z)/\Delta\mathbb Z
\cong\mathbb Z.
$$

The surviving integer is the difference between the two overlap components.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Connected overlap gives vanishing</span>

For the analogous two-set cover of $$S^2$$ by north and south charts, $$U\cap V$$ is connected. Then $$C^1\cong\mathbb Z$$ and every element is a coboundary. This gives $$\check H^1(S^2,\underline{\mathbb Z})=0$$ for that cover.
</div>

## Practical test

To compute a degree-one class:

1. Write the overlap section $$a_{ij}$$.
2. Check the triple-overlap cocycle equation.
3. Try to solve $$a_{ij}=b_j-b_i$$.
4. If no solution exists, identify the invariant left after all possible choices of $$b_i$$.

<nav class="sc-nav">
  <a href="/articles/cc-02-covers-cochains-and-coboundary/"><span>Previous</span>Covers and Cochains</a>
  <a class="sc-next" href="/articles/cc-04-refinements-and-leray-covers/"><span>Next</span>Refinements and Leray Covers</a>
</nav>

</article>
