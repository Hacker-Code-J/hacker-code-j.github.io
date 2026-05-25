---
title: "Coding Theory 13: Parameters of Codes on Surfaces"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: surface code parameters, Hansen bound, components, Zarzar-Voloch
short: "The parameter estimates of Chapter 5.4."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-13" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 13</p>

# Parameters of codes on surfaces

<p class="ct-deck">For surface codes, distance is controlled by rational points on zero curves, not by zeros of a function alone.</p>
</header>

Let $$X/\mathbb F_q$$ be a surface, $$P\subset X(\mathbb F_q)$$ a finite evaluation set, and $$\mathcal L=\mathcal L(G)$$. The code is the image of

$$
H^0(X,\mathcal L)\to\mathbb F_q^{|P|}.
$$

Dimension is bounded by $$h^0(X,\mathcal L)$$. If the evaluation map is injective, it is equal to that number. Distance depends on how many evaluation points can lie on a zero divisor $$Z(s)$$ for nonzero sections $$s$$.

## Component-count strategy

If every zero divisor has arithmetic genus $$g_Z$$ and at most $$r$$ irreducible components, then Hasse-Weil type bounds give an upper bound for $$\#Z(s)(\mathbb F_q)$$. This component-count strategy leads naturally to the Hansen approach.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: plane curves</span>

For $$X=\mathbb P^2$$ and $$G=mH$$, a nonzero section vanishes on a plane curve of degree $$m$$. If the curve is irreducible and smooth, its genus is $$(m-1)(m-2)/2$$. If it splits into many rational lines, the rational point count can be much larger.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: why components matter</span>

A degree $$m$$ plane curve that is a union of $$m$$ rational lines can contain roughly $$m(q+1)$$ rational points before intersections are subtracted. A smooth irreducible curve of the same degree is controlled by Hasse-Weil with genus about $$m^2/2$$. The same divisor class can therefore produce different zero counts.
</div>

## Hansen bound

Suppose rational points lie on irreducible curves $$C_1,\ldots,C_r$$, with $$\#C_i(\mathbb F_q)\le N$$. Suppose $$G\cdot C_i\ge0$$ and at most $$l$$ of the curves $$C_i$$ can be contained in a zero divisor. Then

$$
d\ge n-lN-\sum_i G\cdot C_i.
$$

If every $$G\cdot C_i=\eta\le N$$, this becomes

$$
d\ge n-lN-(r-l)\eta.
$$

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: product surface fibers</span>

On $$\mathbb P^1\times\mathbb P^1$$, fix one ruling as the evaluation fibers and use the convention that a divisor of bidegree $$(a,b)$$ restricts to degree $$a$$ on those fibers. For $$0\le a,b<q+1$$, such a divisor can contain at most $$b$$ fibers of that ruling and intersects each remaining fiber in at most $$a$$ rational points. The bound gives $$d\ge(q+1-a)(q+1-b)$$.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: evaluation set affects distance</span>

If evaluation points are spread evenly along ruling fibers, Hansen bound is sharp and structural. If the same number of points is concentrated on a small number of curves, zero divisors containing those curves can destroy distance. Surface codes are sensitive to the geometry of the chosen point set.
</div>

## Zarzar and Voloch context

Zarzar and Voloch studied surface-code bounds and decoding ideas. Their work is part of the surface-code context, but the source text repeatedly stresses that surface decoding is far less mature than curve decoding. A surface section vanishes on curves, so an error locator would have to control curve components rather than finite sets alone.

<nav class="ct-nav">
  <a href="/articles/ct-12-surface-geometry-for-codes/"><span>Previous</span>Surface Geometry</a>
  <a class="ct-next" href="/articles/ct-14-ruled-surfaces-geometry/"><span>Next</span>Ruled Surface Geometry</a>
</nav>

</article>
