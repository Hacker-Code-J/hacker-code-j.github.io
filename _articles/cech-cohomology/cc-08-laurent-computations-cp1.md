---
title: "Čech Cohomology 08: Laurent Computations on CP1"
layout: page
categories: Mathematics
tags: [cech-cohomology, cp1, line-bundles]
topics: CP1, O(n), Laurent series, H0, H1
short: "The standard two-chart cover of CP1 turns line-bundle cohomology into Laurent-series splitting."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-08" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 08</p>

# Laurent computations on $$\mathbb{CP}^1$$

<p class="sc-deck">On the standard two-chart cover of $$\mathbb{CP}^1$$, Čech cohomology becomes the problem of splitting Laurent series into chart-extendable pieces.</p>
</header>

Let

$$
U_0=\{Z_0\ne0\}\simeq\mathbb C,\qquad
U_\infty=\{Z_1\ne0\}\simeq\mathbb C,
$$

with coordinates $$z=Z_1/Z_0$$ and $$w=1/z$$. The overlap is $$\mathbb C^*$$.

Because this is a two-set cover, there are no triple intersections. Every $$1$$-cochain is automatically a cocycle. The only question is whether it is a coboundary.

## The structure of $$H^1$$

For a sheaf $$\mathcal F$$ on this cover,

$$
\check H^1(\mathfrak U,\mathcal F)
=
\frac{\mathcal F(U_0\cap U_\infty)}
{\mathcal F(U_\infty)|_{U_0\cap U_\infty}
-\mathcal F(U_0)|_{U_0\cap U_\infty}}.
$$

This is the calculus template again: an overlap section is an error term; local sections on the two charts are corrections; the quotient keeps errors that cannot be corrected.

## The trivial bundle

For $$\mathcal O$$, a section on the overlap has a Laurent expansion

$$
f(z)=\sum_{k\in\mathbb Z}a_kz^k.
$$

Terms with $$k\ge0$$ extend holomorphically to $$U_0$$. Terms with $$k<0$$ become nonnegative powers of $$w$$ and extend to $$U_\infty$$. Thus every overlap section splits into two chart sections:

$$
H^1(\mathbb{CP}^1,\mathcal O)=0.
$$

## Twisting by $$\mathcal O(n)$$

For $$\mathcal O(n)$$, the transition function changes the splitting rule. The same Laurent monomial may be removable from one chart after twisting but not from the other.

The result is

$$
h^0(\mathbb{CP}^1,\mathcal O(n))=
\begin{cases}
n+1,& n\ge0,\\
0,& n<0,
\end{cases}
$$

and

$$
h^1(\mathbb{CP}^1,\mathcal O(n))=
\begin{cases}
0,& n\ge -1,\\
-n-1,& n\le -2.
\end{cases}
$$

Čech cohomology explains the formulas by showing which Laurent monomials survive after all allowable local corrections are subtracted.

<div class="sc-example" markdown="1">
<span class="sc-env-title">The first surviving class</span>

For $$\mathcal O(-2)$$, one Laurent monomial survives the correction process. This gives

$$
H^1(\mathbb{CP}^1,\mathcal O(-2))\cong\mathbb C.
$$

The class is not a mystery: it is an overlap term that cannot be extended away by holomorphic sections on the two charts.
</div>

## How to use this pattern

When a computation reduces to functions on an annulus or punctured coordinate chart, try to write overlap data as a Laurent series. Then divide the terms into:

1. terms removable from the first chart;
2. terms removable from the second chart;
3. terms that survive in the quotient.

Those surviving terms are Čech representatives.

<nav class="sc-nav">
  <a href="/articles/cc-07-exact-sequences-connecting-maps/"><span>Previous</span>Exact Sequences and Connecting Maps</a>
  <a class="sc-next" href="/articles/cc-09-de-rham-to-cech-computation/"><span>Next</span>de Rham to Čech Computation</a>
</nav>

</article>
