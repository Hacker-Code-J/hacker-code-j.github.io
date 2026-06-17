---
title: "Čech Cohomology 02: Covers, Cochains, and Coboundary"
layout: page
categories: Mathematics
tags: [cech-cohomology, cochains, coboundary]
topics: open covers, intersections, Cech complex, delta squared
short: "The Čech complex is built from sections on multiple intersections."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-02" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 02</p>

# Covers, cochains, and coboundary

<p class="sc-deck">A Čech cochain is a table of local sections indexed by intersections. The coboundary is the alternating sum that checks compatibility on one more overlap.</p>
</header>

The calculus bridge said: solve locally, compare the local answers on overlaps, and ask whether the comparison can be removed by changing the local choices. This article turns that sentence into the Čech complex.

Let $$X$$ be a topological space, let $$\mathcal F$$ be a sheaf of abelian groups, and choose an open cover

$$
\mathfrak U=\{U_i\}_{i\in I}.
$$

For a tuple of indices, write

$$
U_{i_0\cdots i_q}=U_{i_0}\cap\cdots\cap U_{i_q}.
$$

The Čech group of $$q$$-cochains is

$$
C^q(\mathfrak U,\mathcal F)=
\prod_{i_0<\cdots<i_q}\mathcal F(U_{i_0\cdots i_q}).
$$

Thus a cochain $$c\in C^q$$ assigns a section

$$
c_{i_0\cdots i_q}\in\mathcal F(U_{i_0\cdots i_q})
$$

to each nonempty $$(q+1)$$-fold intersection.

## The coboundary

The coboundary $$\delta:C^q\to C^{q+1}$$ is the alternating restriction sum

$$
(\delta c)_{i_0\cdots i_{q+1}}
=
\sum_{r=0}^{q+1}(-1)^r
c_{i_0\cdots\widehat{i_r}\cdots i_{q+1}}
\big|_{U_{i_0\cdots i_{q+1}}}.
$$

The hat means that the index is omitted. Every term is restricted to the same smaller open set, so the sum makes sense.

<div class="sc-env" markdown="1">
<span class="sc-env-title">Low-degree formulas</span>

For a $$0$$-cochain $$s=\{s_i\}$$,

$$
(\delta s)_{ij}=s_j|_{U_{ij}}-s_i|_{U_{ij}}.
$$

For a $$1$$-cochain $$a=\{a_{ij}\}$$,

$$
(\delta a)_{ijk}=a_{jk}|_{U_{ijk}}
-a_{ik}|_{U_{ijk}}
+a_{ij}|_{U_{ijk}}.
$$
</div>

## Why $$\delta^2=0$$

Applying $$\delta$$ twice gives zero. The reason is purely combinatorial. In $$(\delta\delta c)_{i_0\cdots i_{q+2}}$$ every term is obtained by omitting two indices. Omitting $$i_r$$ and then $$i_s$$ gives the same restricted section as omitting $$i_s$$ and then $$i_r$$, but the signs are opposite. Terms cancel in pairs.

Therefore one can define

$$
\check H^q(\mathfrak U,\mathcal F)
=
\frac{\ker(\delta:C^q\to C^{q+1})}
{\operatorname{im}(\delta:C^{q-1}\to C^q)}.
$$

This is the overlap version of the calculus identities

$$
\nabla\times\nabla f=0,\qquad
\nabla\cdot(\nabla\times A)=0.
$$

In calculus, applying the next differential operator kills the previous output. In Čech cohomology, checking compatibility one overlap higher kills data that already came from lower-degree choices.

## How to read a class

A cocycle is compatible local data. A coboundary is compatible local data that came from choices one degree lower. A cohomology class is the part of the compatibility data that cannot be removed by changing those lower-degree choices.

<div class="sc-example" markdown="1">
<span class="sc-env-title">A diagnostic for signs</span>

In degree one, a cocycle satisfies

$$
a_{ik}=a_{ij}+a_{jk}
$$

on triple overlaps. If your convention writes transition from chart $$i$$ to chart $$j$$ in the opposite direction, the same geometry may appear with all signs reversed. The cohomology class is unchanged after consistently changing convention.
</div>

<nav class="sc-nav">
  <a href="/articles/cc-01-de-rham-calculus-bridge/"><span>Previous</span>de Rham and Calculus Bridge</a>
  <a class="sc-next" href="/articles/cc-03-degree-zero-and-one/"><span>Next</span>Degree Zero and One</a>
</nav>

</article>
